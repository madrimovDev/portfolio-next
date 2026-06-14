import { Metadata } from "next";
import Link from "next/link";
import Experience from "~/components/experience/experience";
import Header from "~/components/header/header";
import MyWork from "~/components/my-work/my-work";
import Skills from "~/components/skills/skills";
import Portfolio from "~/components/portfolio/portfolio";
import LatestPosts from "~/components/latest-posts/latest-posts";
import { getDict } from "~/dict";
import { PropsWithParams } from "~/types";

export const revalidate = 300;

export async function generateMetadata({
	params,
}: PropsWithParams): Promise<Metadata> {
	const { header, work } = await getDict(params.lang);

	return {
		title: `${header.name} — ${header.jobTitle}`,
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
		manifest: "site.webmanifest",
		openGraph: {
			type: "website",
			locale: params.lang,
			url: "https://www.madrimov.uz",
			siteName: "Madrimov Xudoshukur Portfolio",
			images: [
				{
					url: "https://www.madrimov.uz/avatar.jpg",
					alt: "Madrimov Xudoshukur Portfolio",
				},
			],
		},
		twitter: {
			creatorId: "@madrimov_x",
			site: "@madrimov_x",
			card: "summary_large_image",
		},
		robots: {
			index: true,
			follow: true,
		},
	};
}

export default async function Home({ params }: PropsWithParams) {
	const { portfolio } = await getDict(params.lang);
	return (
		<>
			<Header lang={params.lang} />
			<MyWork lang={params.lang} />
			<Skills lang={params.lang} />
			<Experience lang={params.lang} />
			<Portfolio lang={params.lang} limit={6} />
			<div className="mx-auto -mt-8 max-w-5xl px-5 text-center sm:text-left">
				<Link href={`/${params.lang}/portfolio`} className="btn-ghost-line">
					{portfolio.viewAll}
					<span aria-hidden>→</span>
				</Link>
			</div>
			<LatestPosts lang={params.lang} limit={3} />
		</>
	);
}
