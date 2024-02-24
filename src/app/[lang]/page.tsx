import { Metadata, ResolvingMetadata } from "next";
import Experience from "~/components/experience/experience";
import Header from "~/components/header/header";
import MyWork from "~/components/my-work/my-work";
import { getDict } from "~/dict";
import { PropsWithParams } from "~/types";

export async function generateMetadata({
	params,
}: PropsWithParams): Promise<Metadata> {
	const { header, work } = await getDict(params.lang);

	return {
		title: `${header.name} - ${header.jobTitle}`,
		description: work.desc,
		creator: header.name,
		keywords: [
			"Frontend",
			"Javascript",
			"Typescript",
			"NextJS",
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
			nocache: false,
			googleBot: {
				index: true,
				follow: true,
				noimageindex: true,
			},
		},
	};
}

export default function Home({ params }: PropsWithParams) {
	return (
		<main className="">
			<Header lang={params.lang} />
			<hr className="border-base-content/50 my-10" />
			<MyWork lang={params.lang} />
			<hr className="border-base-content/50 my-10" />
			<Experience lang={params.lang} />
		</main>
	);
}

