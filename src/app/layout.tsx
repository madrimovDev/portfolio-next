import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
	subsets: ["latin", "cyrillic"],
	variable: "--font-sans",
	display: "swap",
});

const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	weight: ["500", "600", "700"],
	variable: "--font-display",
	display: "swap",
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
			className={`h-full ${inter.variable} ${spaceGrotesk.variable}`}
		>
			<body className="font-sans h-full flex flex-col bg-ink text-[#e7e8f0] antialiased">
				{children}
				<Analytics />
			</body>
		</html>
	);
}
