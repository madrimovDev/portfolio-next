# madrimov.uz — Portfolio redizayn spetsifikatsiyasi

**Sana:** 2026-06-09
**Manba:** HeadHunter rezume (`~/Projects/headhunter-resume/resume-ru.md`) + `madrimov-profile`
**Qaror:** Bold/kreativ dizayn · gradient loyiha kartochkalari · MBOS loyihalari ochiq

---

## 1. Maqsad / kontekst

Hozirgi madrimov.uz "Frontend Developer" sifatida eskirgan kontent va sodda DaisyUI
dizayniga ega. Maqsad — saytni yangi rezume bilan sinxron qilish (**Team Lead /
Fullstack**) va bold, zamonaviy dev-portfolio ko'rinishiga keltirish. 3 til
(uz/ru/en) saqlanadi.

## 2. Vizual til

- **Fon:** deyarli qora (#0a0a0f) + nozik grid/gradient "blob"lar.
- **Accent:** gradient — indigo → violet → fuchsia (+ cyan ikkilamchi).
- **Tipografiya:** katta, qalin display sarlavhalar; gradient matnli urg'u (role).
- **Effektlar:** glassmorphism kartalar, glow halqa (avatar), hover/entrance
  CSS animatsiyalari (og'ir kutubxonasiz — framer-motion qo'shmaymiz).
- **Mavzu:** yagona, bir butun dark tema (DaisyUI theme-switcher olib tashlanadi;
  faqat **til** almashtirgich qoladi).

## 3. Sahifa tuzilishi (bosh sahifa, single-page hissi)

1. **Hero** — katta ism, gradient role ("Team Lead / Fullstack Developer"),
   subtitle, CTA tugmalar (Bog'lanish · CV yuklab olish · GitHub), glow avatar,
   fon gradient blob + grid.
2. **About** — shaxsiy, jonli matn (rezume prozasi EMAS — har til o'z ohangida) +
   ijtimoiy linklar (GitHub, Telegram, Email).
3. **Skills** *(yangi bo'lim)* — guruhlangan badge'lar: Frontend / Backend /
   Desktop / Tools.
4. **Experience** — vertikal timeline: MBOS (2023–hozir, loyiha chiplari bilan),
   Technolab (2022–2023, Online-Education), Data Talim (2021–2023).
5. **Projects** — gradient-fonli kartalar grid (nom + tavsif + texnologiya badge +
   private/link belgisi). Bosh sahifada top loyihalar, `/portfolio` da to'liq ro'yxat.
6. **Footer.**

## 4. Kontent o'zgarishlari (3 til sinxron)

- **header:** name = "Madrimov Xudoshukur" / "Мадримов Худошукур"; jobTitle =
  "Team Lead / Fullstack Developer".
- **about (work):** matn yangilanadi (fullstack + lead urg'usi); links = GitHub,
  Telegram, Email (Instagram olib tashlanadi).
- **skills:** yangi maydon (kategoriyalar bo'yicha).
- **experience.organizations:** Youcode → Technolab birlashtiriladi; MBOS yili
  2023 ga to'g'rilanadi; har org uchun ixtiyoriy `stack[]` / `projects[]`.
- **projects:** 2 → ~7: MNazorat, M-Smart School, M-Smart Kids, e-Jarima maydon,
  Monro Delivery, Online-Education, Electron Toolkit (npm). Har biriga `tags[]`,
  `gradient`, `private`/`link`.

## 5. Texnik o'zgarishlar

- `src/dict/{uz,ru,en}.json` — kontent (uchalasi sinxron).
- `src/types/index.d.ts` — yangi maydonlar (skills, projects.gradient/private, org.stack).
- `src/app/globals.css` — design tokenlar, animatsiyalar.
- `tailwind.config.ts` — rang palitra, yagona dark tema.
- Komponentlar: header→hero, my-work→about, **skills (yangi)**, experience (timeline),
  portfolio-card (gradient), footer, navbar (soddalashtirish).
- `layout.tsx` + `page.tsx` metadata: "Fullstack", `robots.index: true` (hozir
  `[lang]/layout.tsx` da `index:false` — SEO uchun tuzatiladi). Skills/Projects
  bosh sahifaga qo'shiladi.
- `public/`: `resume.pdf` (CV tugmasi uchun), og-image (ixtiyoriy).

## 6. Cheklovlar

- **Bu jonli sayt.** Barcha o'zgarishlar LOKAL; foydalanuvchi roziligisiz
  commit/push/deploy QILINMAYDI.
- Rezume prozasini ko'chirib o'tkazmaslik — portfolio ohangi shaxsiy/jonli.
- Maxfiy MBOS loyihalari faqat nom+tavsif+stek (kod havolasiz).

## 7. Tekshirish

- `next dev` da har bo'lim 3 tilda render bo'lishini skrinshot bilan tekshirish.
- `next build` xatosiz o'tishi.
- Mobil + desktop responsive.
