import { Lang } from "~/types";

/** Bitta canonical host — www'siz (foydalanuvchi tanlovi). */
export const SITE_URL = "https://madrimov.uz";
export const LOCALES: Lang[] = ["uz", "ru", "en"];
export const DEFAULT_LOCALE: Lang = "uz";
export const SITE_NAME = "Madrimov Xudoshukur";
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** OpenGraph locale kodlari (og:locale uchun). */
export const OG_LOCALE: Record<Lang, string> = {
	uz: "uz_UZ",
	ru: "ru_RU",
	en: "en_US",
};

export function isLang(x: string): x is Lang {
	return (LOCALES as string[]).includes(x);
}

/** hreflang languages xaritasi — suffix lang prefiksisiz bo'lishi kerak (masalan "" yoki "/blog/x"). */
export function altLanguages(suffix: string): Record<string, string> {
	const languages: Record<string, string> = {};
	for (const l of LOCALES) languages[l] = `${SITE_URL}/${l}${suffix}`;
	languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${suffix}`;
	return languages;
}

/** Har sahifaning canonical + hreflang alternates obyekti. Layout'da EMAS, faqat sahifada. */
export function alternates(lang: Lang, suffix: string) {
	return {
		canonical: `${SITE_URL}/${lang}${suffix}`,
		languages: altLanguages(suffix),
	};
}

/** To'liq sahifa URL (og:url uchun). */
export function pageUrl(lang: Lang, suffix: string): string {
	return `${SITE_URL}/${lang}${suffix}`;
}
