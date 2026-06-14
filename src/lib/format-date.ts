import { Lang } from "~/types";

const MONTHS: Record<Lang, string[]> = {
	uz: [
		"yanvar", "fevral", "mart", "aprel", "may", "iyun",
		"iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr",
	],
	ru: [
		"января", "февраля", "марта", "апреля", "мая", "июня",
		"июля", "августа", "сентября", "октября", "ноября", "декабря",
	],
	en: [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December",
	],
};

/** ISO sanani ("2026-06-14") tilga mos formatga aylantiradi. Date'siz (SSR-safe). */
export function formatDate(iso: string, lang: Lang): string {
	const [y, m, d] = iso.split("-").map(Number);
	if (!y || !m || !d) return iso;
	const month = MONTHS[lang][m - 1] ?? "";
	return lang === "en" ? `${month} ${d}, ${y}` : `${d}-${month}, ${y}`;
}
