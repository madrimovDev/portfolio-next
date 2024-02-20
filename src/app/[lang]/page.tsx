import { Metadata, ResolvingMetadata } from "next";
import Experience from "~/components/experience/experience";
import Header from "~/components/header/header";
import MyWork from "~/components/my-work/my-work";
import { getDict } from "~/dict";
import { PropsWithLang, PropsWithParams } from "~/types";


export async function generateMetadata(
  { params }: PropsWithParams,
  parent: ResolvingMetadata
): Promise<Metadata> {
 
	const {header, work} = await getDict(params.lang)
 
  return {
		title: `${header.name} - ${header.jobTitle}`,
		description: work.desc,
		authors: {
			name: header.name,
			url: work.links[0]
		},
		creator: header.name,
		keywords: ['Frontend', 'Javascript', 'Typescript', 'NextJS', 'Madrimov', 'Xudoshukur Madrimov'],
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
			index: false,
			follow: true,
			nocache: true,
			googleBot: {
				index: true,
				follow: false,
				noimageindex: true,
				"max-video-preview": -1,
				"max-image-preview": "large",
				"max-snippet": -1,
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

