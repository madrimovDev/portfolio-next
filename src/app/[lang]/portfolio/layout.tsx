import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { getDict } from "~/dict";
import { Lang } from "~/types";
import { SITE_NAME, OG_LOCALE, alternates, pageUrl } from "~/lib/seo";

const PORT_DESC: Record<Lang, string> = {
	uz: "Madrimov Xudoshukur tomonidan ishlab chiqilgan production loyihalari — React, Next.js, Node.js, Bun va Electron bilan.",
	ru: "Production-проекты Худошукура Мадримова — на React, Next.js, Node.js, Bun и Electron.",
	en: "Production projects by Madrimov Xudoshukur — built with React, Next.js, Node.js, Bun and Electron.",
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: Lang }>;
}): Promise<Metadata> {
	const { lang } = await params;
	const { portfolio } = await getDict(lang);
	const suffix = "/portfolio";
	return {
		title: portfolio.title,
		description: PORT_DESC[lang],
		alternates: alternates(lang, suffix),
		openGraph: {
			type: "website",
			locale: OG_LOCALE[lang],
			url: pageUrl(lang, suffix),
			title: portfolio.title,
			description: PORT_DESC[lang],
			siteName: `${SITE_NAME} Portfolio`,
			images: [{ url: "/avatar.jpg", alt: portfolio.title }],
		},
	};
}

export default function Layout({ children }: PropsWithChildren) {
	return <>{children}</>;
}
