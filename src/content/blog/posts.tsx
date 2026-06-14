/* eslint-disable react/no-unescaped-entities */
import { ReactNode } from "react";

export type BlogPost = {
	slug: string;
	title: string;
	date: string; // ISO, e.g. "2026-06-14"
	description: string;
	tags: string[];
	body: ReactNode;
};

/**
 * Maqolalar shu yerda yashaydi (dependency-siz, type-safe).
 * Yangi post qo'shish: massiv boshiga yangi obyekt qo'shing.
 * `body` — `prose` ichida render bo'ladigan JSX (h2/p/ul/code/...).
 */
export const posts: BlogPost[] = [
	{
		slug: "bun-hono-production",
		title: "Bun + Hono: production'da bir yil",
		date: "2026-06-14",
		description:
			"Node.js'dan Bun + Hono stack'iga o'tish — nima uchun, qanday va qaysi holatlarda ehtiyot bo'lish kerak.",
		tags: ["Bun", "Hono", "Backend", "Arxitektura"],
		body: (
			<>
				<p>
					So'nggi bir yil davomida bir nechta production tizimni{" "}
					<strong>Bun + Hono</strong> stack'ida ishlab chiqdik — maktab boshqaruvi
					platformasidan kafe raqamlashtirish API'sigacha. Quyida amaliyotdan
					olingan asosiy xulosalar.
				</p>

				<h2>Nega Bun?</h2>
				<p>
					Asosiy sabab — tezlik va yagona toolchain. <code>bun install</code>{" "}
					sezilarli tez, test-runner va bundler bitta vositada. Monorepo'da bu
					ayniqsa seziladi.
				</p>
				<ul>
					<li>Tez o'rnatish va ishga tushirish (cold start past)</li>
					<li>TypeScript'ni to'g'ridan ishlatish — qo'shimcha build qadami yo'q</li>
					<li>Node API'lari bilan deyarli to'liq moslik</li>
				</ul>

				<h2>Nega Hono?</h2>
				<p>
					Hono yengil, type-safe va Bun'ga juda mos. Express'ga o'rganib qolganlar
					uchun o'tish oson, lekin tiplar ancha kuchli — ayniqsa{" "}
					<code>Drizzle ORM</code> bilan birga.
				</p>

				<h2>Qaysi holatda ehtiyot bo'lish kerak</h2>
				<p>
					Ba'zi keng tarqalgan native paketlar hali Bun'da to'liq sinovdan
					o'tmagan. Production'ga chiqishdan oldin kritik kutubxonalarni alohida
					tekshiring va CI'da Bun versiyasini qotirib qo'ying.
				</p>

				<h2>Xulosa</h2>
				<p>
					Yangi loyiha uchun Bun + Hono — kuchli, tez va kelajakka yo'naltirilgan
					tanlov. Lekin har qanday stack kabi, uni o'z kontekstingizda sinab
					ko'ring — «ishlasangiz, ishlaydi».
				</p>
			</>
		),
	},
];
