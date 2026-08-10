import { Lang } from "~/types";

const SLUG_RE = /^[a-z0-9-]{1,80}$/;
const LANGS: Lang[] = ["uz", "ru", "en"];

export function isValidSlug(s: string): boolean {
	return SLUG_RE.test(s);
}

export function isValidLang(s: string): s is Lang {
	return (LANGS as string[]).includes(s);
}

// Barcha boshqaruv belgilari. Faylda xom boshqaruv bayti emas, \u escape
// ketma-ketligi turadi — nusxa olishda buzilmasin.
 
const CTRL_ALL = /[\u0000-\u001F\u007F]/g;

// Boshqaruv belgilari, LEKIN yangi qator (0x0A) saqlanadi —
// fikr matnida abzats bo‘lishi mumkin.
 
const CTRL_KEEP_NL = /[\u0000-\u0009\u000B-\u001F\u007F]/g;

export function cleanName(raw: unknown): string | null {
	if (typeof raw !== "string") return null;
	const v = raw.replace(CTRL_ALL, " ").replace(/\s+/g, " ").trim();
	return v.length >= 2 && v.length <= 40 ? v : null;
}

export function cleanBody(raw: unknown): string | null {
	if (typeof raw !== "string") return null;
	const v = raw
		.replace(CTRL_KEEP_NL, " ")
		.replace(/[ \t]+/g, " ")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
	return v.length >= 3 && v.length <= 2000 ? v : null;
}
