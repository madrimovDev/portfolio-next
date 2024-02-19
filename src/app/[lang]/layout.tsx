import type { Metadata } from "next";
import Footer from "~/components/footer/footer";
import Navbar from "~/components/navbar/navbar";
import { getDict } from "~/dict";

export const metadata: Metadata = {
	title: "Madrimov Xudoshukur - Frontend Developer",
	description:
		"Welcome to the portfolio of Madrimov Xudoshukur, a skilled frontend developer with expertise in React, Next.js, and more.",
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

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	params: {
		lang: string;
	};
	children: React.ReactNode;
}>) {
	const dict = await getDict(params.lang as "uz" | "en");
	return (
		<div className="flex flex-col h-full">
			<div className="min-h-[4rem] mt-2">
				<Navbar items={dict.menu} />
			</div>
			<div className="flex-grow w-full max-w-screen-sm mx-auto px-4">
				{children}
			</div>
			<Footer />
		</div>
	);
}

