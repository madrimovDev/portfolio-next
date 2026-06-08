import type { Metadata } from "next";
import Footer from "~/components/footer/footer";
import Navbar from "~/components/navbar/navbar";
import { getDict } from "~/dict";
import { Lang } from "~/types";

export const metadata: Metadata = {
	metadataBase: new URL("https://www.madrimov.uz"),
	title: "Madrimov Xudoshukur — Team Lead / Fullstack Developer",
	description:
		"Portfolio of Madrimov Xudoshukur — Team Lead and Fullstack developer building production products with React, Next.js, Node.js, Bun and TypeScript.",
	manifest: "site.webmanifest",
	openGraph: {
		type: "website",
		locale: "en_US",
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
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	params: {
		lang: string;
	};
	children: React.ReactNode;
}>) {
	const dict = await getDict(params.lang as Lang);
	return (
		<div className="flex min-h-full flex-col">
			<Navbar items={dict.menu} />
			<main className="flex-grow w-full">{children}</main>
			<Footer />
		</div>
	);
}
