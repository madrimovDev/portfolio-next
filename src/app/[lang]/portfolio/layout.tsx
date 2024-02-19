import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
	title: "Madrimov Xudoshukur - Portfolio",
	description:
		"Explore the portfolio of Madrimov Xudoshukur, a talented frontend developer showcasing projects in React, Next.js, and more.",
	openGraph: {
		type: "website",
		url: "https://www.example.com/portfolio",
		title: "Madrimov Xudoshukur - Portfolio",
		description:
			"Explore the portfolio of Madrimov Xudoshukur, a talented frontend developer showcasing projects in React, Next.js, and more.",
		images: [
			{
				url: "https://www.madrimov.uz/mbos-lead.png",
				width: 800,
				height: 600,
				alt: "Madrimov Xudoshukur - Portfolio Preview",
			},
		],
		siteName: "Madrimov Xudoshukur Portfolio",
	},
};

export default function Layout({ children }: PropsWithChildren) {
	return <>{children}</>;
}

