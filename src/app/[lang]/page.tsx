import { Metadata } from "next";
import JsonLd from "~/components/json-ld/json-ld";
import {
	SITE_URL,
	SITE_NAME,
	OG_LOCALE,
	PERSON_ID,
	WEBSITE_ID,
	alternates,
	pageUrl,
} from "~/lib/seo";
import SignalEffects from "~/components/signal-effects/signal-effects";
import StatusTicker from "~/components/status-ticker/status-ticker";
import Experience from "~/components/experience/experience";
import Header from "~/components/header/header";
import MyWork from "~/components/my-work/my-work";
import Sectors from "~/components/sectors/sectors";
import Skills from "~/components/skills/skills";
import Portfolio from "~/components/portfolio/portfolio";
import LatestPosts from "~/components/latest-posts/latest-posts";
import { getDict } from "~/dict";
import { PropsWithParams } from "~/types";

export const revalidate = 300;

export async function generateMetadata(props: PropsWithParams): Promise<Metadata> {
    const params = await props.params;
    const { header, work } = await getDict(params.lang);

    return {
		title: { absolute: `${header.name} — ${header.jobTitle}` },
		description: work.desc,
		creator: header.name,
		keywords: [
			"Fullstack",
			"Team Lead",
			"Frontend",
			"Backend",
			"React",
			"Next.js",
			"Node.js",
			"TypeScript",
			"Madrimov",
			"Xudoshukur Madrimov",
		],
		alternates: alternates(params.lang, ""),
		openGraph: {
			type: "website",
			locale: OG_LOCALE[params.lang],
			url: pageUrl(params.lang, ""),
			siteName: `${SITE_NAME} Portfolio`,
			images: [{ url: "/avatar.jpg", alt: `${SITE_NAME} Portfolio` }],
		},
	};
}

export default async function Home(props: PropsWithParams) {
    const params = await props.params;
    const { header } = await getDict(params.lang);
    const personLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		"@id": PERSON_ID,
		name: "Xudoshukur Madrimov",
		alternateName: "Madrimov Xudoshukur",
		url: SITE_URL,
		image: `${SITE_URL}/avatar.jpg`,
		jobTitle: header.jobTitle,
		sameAs: [
			"https://github.com/madrimovDev",
			"https://t.me/madrimov",
		],
	};
    const websiteLd = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": WEBSITE_ID,
		url: SITE_URL,
		name: SITE_NAME,
		inLanguage: params.lang,
		publisher: { "@id": PERSON_ID },
	};
    return (
		<>
			<JsonLd data={[personLd, websiteLd]} />
			<SignalEffects />
			<StatusTicker />
			<Header lang={params.lang} />
			<Sectors />
			<MyWork lang={params.lang} />
			<Skills lang={params.lang} />
			<Experience lang={params.lang} />
			<Portfolio lang={params.lang} limit={6} />
			<LatestPosts lang={params.lang} limit={3} />
		</>
	);
}
