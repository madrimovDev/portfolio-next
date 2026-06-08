import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "Madrimov Xudoshukur — Projects",
	description:
		"Selected production projects by Madrimov Xudoshukur — fullstack platforms built with React, Next.js, Node.js, Bun, Electron and TypeScript.",
	openGraph: {
		type: "website",
		url: "https://www.madrimov.uz/portfolio",
		title: "Madrimov Xudoshukur — Projects",
		description:
			"Selected production projects by Madrimov Xudoshukur — fullstack platforms built with React, Next.js, Node.js, Bun, Electron and TypeScript.",
		images: [
			{
				url: "https://www.madrimov.uz/avatar.jpg",
				width: 800,
				height: 600,
				alt: "Madrimov Xudoshukur — Projects",
			},
		],
		siteName: "Madrimov Xudoshukur Portfolio",
	},
};

export default function Layout({ children }: PropsWithChildren) {
	return <>{children}</>;
}
