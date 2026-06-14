import { Unbounded, Golos_Text, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const display = Unbounded({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800"],
	variable: "--font-display",
	display: "swap",
});

const sans = Golos_Text({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-sans",
	display: "swap",
});

const mono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-mono",
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
			className={`h-full ${display.variable} ${sans.variable} ${mono.variable}`}
		>
			<body className="font-sans bg-base text-fg antialiased">
				{children}
				<Analytics />
			</body>
		</html>
	);
}
