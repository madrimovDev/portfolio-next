-- Supabase SQL Editor'da qo'lda ishga tushiriladi.
-- Har blok kutilgan natijani izohda ko'rsatadi.

-- 0) Tozalash (faqat test ma'lumoti)
delete from comments    where slug = 'test-slug';
delete from clap_budget where slug = 'test-slug';
delete from post_stats  where slug = 'test-slug';

-- 1) increment_views noma'lum slug'da 0 QATOR qaytaradi va qator YARATMAYDI
select * from increment_views('test-slug');
-- kutilgan: 0 qator
select count(*) from post_stats where slug = 'test-slug';
-- kutilgan: 0

-- 1b) get_comments FAQAT O'QIYDI — noma'lum slug'da ham qator yaratmaydi.
-- (Ommaviy GET /api/posts/[slug]/comments shuni chaqiradi.)
select * from get_comments('test-slug', 'uz');
-- kutilgan: 0 qator
select count(*) from post_stats where slug = 'test-slug';
-- kutilgan: 0  <-- 1 bo'lsa, ommaviy endpoint bazani to'ldira oladi. TO'XTANG.

-- 2) get_post_thread qatorni yaratadi
select * from get_post_thread('test-slug', 'uz');
-- kutilgan: 0 fikr
select count(*) from post_stats where slug = 'test-slug';
-- kutilgan: 1

-- 3) Endi increment_views ishlaydi
select * from increment_views('test-slug');
-- kutilgan: views=1

-- 4) Qarsak 1..10 ga qisiladi
select * from add_claps('test-slug', 999, 'hash-a');
-- kutilgan: claps=10, remaining=40

-- 5) 50 chegarasi
select * from add_claps('test-slug', 10, 'hash-a');
select * from add_claps('test-slug', 10, 'hash-a');
select * from add_claps('test-slug', 10, 'hash-a');
select * from add_claps('test-slug', 10, 'hash-a');
-- kutilgan: oxirgisida claps=50, remaining=0
select * from add_claps('test-slug', 10, 'hash-a');
-- kutilgan: claps=50, remaining=0 (o'zgarmaydi)

-- 6) Komentariya rate-limit: 4-chisi rad etiladi
select * from add_comment('test-slug', 'uz', 'Aziz', 'birinchi fikr',  'hash-b');
select * from add_comment('test-slug', 'uz', 'Aziz', 'ikkinchi fikr',  'hash-b');
select * from add_comment('test-slug', 'uz', 'Aziz', 'uchinchi fikr',  'hash-b');
select * from add_comment('test-slug', 'uz', 'Aziz', 'to''rtinchi fikr', 'hash-b');
-- kutilgan: oxirgisida error='rate_limited'

-- 7) Takroriy matn rad etiladi
select * from add_comment('test-slug', 'uz', 'Bek', 'birinchi fikr', 'hash-c');
-- kutilgan: error='duplicate'

-- 8) Noma'lum slug
select * from add_comment('yoq-bunday', 'uz', 'Bek', 'salom', 'hash-c');
-- kutilgan: error='unknown_slug'

-- 9) Til bo'yicha ajratilgan
select * from add_comment('test-slug', 'ru', 'Ivan', 'ruscha fikr', 'hash-d');
select count(*) from get_post_thread('test-slug', 'uz');  -- kutilgan: 3
select count(*) from get_post_thread('test-slug', 'ru');  -- kutilgan: 1

-- 10) Tozalash
delete from comments    where slug = 'test-slug';
delete from clap_budget where slug = 'test-slug';
delete from post_stats  where slug = 'test-slug';
