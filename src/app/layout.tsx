import { Inter } from "next/font/google";
import "./globals.css";
import Beta from "~/components/beta/beta";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({
	subsets: ["latin"],
});

export default async function RootLayout({
	children,
}: Readonly<{
	params: {
		lang: string;
	};
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			data-theme="coffee"
			className="h-full"
		>
			<body className={`${inter.className} h-full flex flex-col`}>
				{children}
				<Beta />
				<Analytics />
			</body>
		</html>
	);
}

