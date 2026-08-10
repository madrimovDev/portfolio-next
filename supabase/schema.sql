-- madrimov.uz blog interaksiyalari
-- Spec: ~/docs/superpowers/specs/2026-08-10-blog-interactions-design.md

-- ---------- Jadvallar ----------

create table if not exists public.post_stats (
	slug  text primary key,
	views bigint not null default 0,
	claps bigint not null default 0
);

create table if not exists public.comments (
	id          uuid primary key default gen_random_uuid(),
	slug        text not null,
	lang        text not null check (lang in ('uz', 'ru', 'en')),
	author_name text not null check (char_length(author_name) between 2 and 40),
	body        text not null check (char_length(body) between 3 and 2000),
	created_at  timestamptz not null default now(),
	ip_hash     text not null
);

-- ro'yxatni o'qish
create index if not exists comments_thread_idx
	on public.comments (slug, lang, created_at desc);

-- rate-limit tekshiruvi; busiz add_comment butun jadvalni seq-scan qiladi
create index if not exists comments_ratelimit_idx
	on public.comments (ip_hash, created_at desc);

create table if not exists public.clap_budget (
	ip_hash text not null,
	slug    text not null,
	count   int not null default 0,
	primary key (ip_hash, slug)
);

-- ---------- RLS: policy YOZILMAYDI ----------
-- Policy'siz RLS = anon va authenticated ga nol ruxsat.
-- service_role RLS'ni chetlab o'tadi va faqat route handler'da ishlatiladi.

alter table public.post_stats  enable row level security;
alter table public.comments    enable row level security;
alter table public.clap_budget enable row level security;

-- ---------- Funksiyalar ----------

-- FAQAT RSC chaqiradi (src/components/comments/comments.tsx).
-- post_stats qatorini TA'MINLAYDI — bu yerga yetib kelgan slug Notion'da
-- allaqachon topilgan (generateMetadata noma'lum slug'da notFound() qiladi).
--
-- DIQQAT: bu funksiya YOZADI. Uni hech qachon ommaviy route handler'dan
-- chaqirmang — aks holda istalgan odam `/api/posts/<tasodifiy>/comments` ni
-- probe qilib bazani soxta qatorlar bilan to'ldira oladi va barcha
-- "UPDATE-only" qorovullari o'sha slug'lar uchun ochilib ketadi.
-- Ommaviy o'qish uchun `get_comments` ishlating.
create or replace function public.get_post_thread(p_slug text, p_lang text)
returns table (id uuid, author_name text, body text, created_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
	insert into post_stats (slug) values (p_slug)
	on conflict (slug) do nothing;

	return query
		select c.id, c.author_name, c.body, c.created_at
		  from comments c
		 where c.slug = p_slug and c.lang = p_lang
		 order by c.created_at desc
		 limit 200;
end;
$$;

-- FAQAT O'QISH. Ommaviy `GET /api/posts/[slug]/comments` shuni chaqiradi.
-- Hech narsa yozmaydi, shuning uchun noma'lum slug bilan chaqirilsa ham
-- bazada iz qoldirmaydi — bo'sh ro'yxat qaytaradi.
create or replace function public.get_comments(p_slug text, p_lang text)
returns table (id uuid, author_name text, body text, created_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
	select c.id, c.author_name, c.body, c.created_at
	  from comments c
	 where c.slug = p_slug and c.lang = p_lang
	 order by c.created_at desc
	 limit 200;
$$;

create or replace function public.get_stats(p_slug text)
returns table (views bigint, claps bigint)
language sql
stable
security definer
set search_path = public
as $$
	select s.views, s.claps from post_stats s where s.slug = p_slug;
$$;

-- UPDATE-only: qator yo'q bo'lsa 0 qator qaytaradi -> route 404
--
-- CTE ishlatilgan: RETURNS TABLE ning OUT nomlari (views/claps) funksiya
-- tanasida ko'rinadi va UPDATE ... RETURNING bilan nom to'qnashuvi berishi
-- mumkin. CTE ichida v/c ga alias qilinsa, hech qanday noaniqlik qolmaydi.
create or replace function public.increment_views(p_slug text)
returns table (views bigint, claps bigint)
language sql
security definer
set search_path = public
as $$
	with upd as (
		update post_stats s
		   set views = s.views + 1
		 where s.slug = p_slug
		returning s.views as v, s.claps as c
	)
	select upd.v, upd.c from upd;
$$;

-- Bir odam (ip_hash) bir maqolaga jami 50 tagacha qarsak.
-- Bir so'rovda 1..10 oralig'iga qisiladi.
create or replace function public.add_claps(p_slug text, p_count int, p_ip_hash text)
returns table (claps bigint, remaining int)
language plpgsql
security definer
set search_path = public
as $$
declare
	v_max   constant int := 50;
	v_req   int := least(greatest(coalesce(p_count, 1), 1), 10);
	v_used  int;
	v_grant int;
	v_claps bigint;
begin
	perform 1 from post_stats where slug = p_slug;
	if not found then
		return;  -- 0 qator -> route 404
	end if;

	insert into clap_budget (ip_hash, slug, count)
	values (p_ip_hash, p_slug, 0)
	on conflict (ip_hash, slug) do nothing;

	select b.count into v_used
	  from clap_budget b
	 where b.ip_hash = p_ip_hash and b.slug = p_slug
	   for update;

	v_grant := greatest(least(v_req, v_max - v_used), 0);

	if v_grant > 0 then
		update clap_budget b
		   set count = b.count + v_grant
		 where b.ip_hash = p_ip_hash and b.slug = p_slug;

		update post_stats s
		   set claps = s.claps + v_grant
		 where s.slug = p_slug
		returning s.claps into v_claps;
	else
		select s.claps into v_claps from post_stats s where s.slug = p_slug;
	end if;

	return query select v_claps, (v_max - v_used - v_grant);
end;
$$;

-- Xatolar exception emas, `error` ustuni orqali qaytadi —
-- route handler ularni HTTP statusga o'giradi.
create or replace function public.add_comment(
	p_slug text, p_lang text, p_name text, p_body text, p_ip_hash text
)
returns table (
	id uuid, author_name text, body text, created_at timestamptz, error text
)
language plpgsql
security definer
set search_path = public
as $$
declare
	v_recent int;
	v_dupe   int;
	v_id     uuid;
	v_now    timestamptz;
begin
	perform 1 from post_stats where slug = p_slug;
	if not found then
		return query select null::uuid, null::text, null::text,
		                    null::timestamptz, 'unknown_slug'::text;
		return;
	end if;

	select count(*) into v_recent
	  from comments c
	 where c.ip_hash = p_ip_hash
	   and c.created_at > now() - interval '10 minutes';
	if v_recent >= 3 then
		return query select null::uuid, null::text, null::text,
		                    null::timestamptz, 'rate_limited'::text;
		return;
	end if;

	select count(*) into v_dupe
	  from comments c
	 where c.slug = p_slug and c.body = p_body;
	if v_dupe > 0 then
		return query select null::uuid, null::text, null::text,
		                    null::timestamptz, 'duplicate'::text;
		return;
	end if;

	insert into comments (slug, lang, author_name, body, ip_hash)
	values (p_slug, p_lang, p_name, p_body, p_ip_hash)
	returning comments.id, comments.created_at into v_id, v_now;

	return query select v_id, p_name, p_body, v_now, null::text;
end;
$$;

-- anon/authenticated RPC ham chaqira olmasin.
--
-- MUHIM: Postgres har bir yangi funksiyaga EXECUTE ni avtomatik `PUBLIC`
-- psevdo-roliga beradi. Faqat `from anon, authenticated` deb revoke qilish
-- YETARLI EMAS — har bir rol PUBLIC a'zosi bo'lgani uchun huquq joyida
-- qoladi va anon kalit bilan `add_comment` ni to'g'ridan chaqirib bo'ladi
-- (bunda route handler'dagi validatsiya, honeypot va rate-limit
-- butunlay chetlab o'tiladi). Shuning uchun avval PUBLIC dan olib tashlaymiz,
-- keyin faqat service_role ga qaytarib beramiz.
--
-- DIQQAT: bu faqat shu paytda MAVJUD funksiyalarni qamraydi. Kelajakda
-- yangi funksiya qo'shilsa, quyidagi uch qatorni qayta ishga tushirish shart.
revoke execute on all functions in schema public from public;
revoke execute on all functions in schema public from anon, authenticated;
grant  execute on all functions in schema public to service_role;
