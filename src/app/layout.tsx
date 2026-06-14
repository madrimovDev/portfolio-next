import { IBM_Plex_Sans, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const plexSans = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-sans",
	display: "swap",
});

const bricolage = Bricolage_Grotesque({
	subsets: ["latin"],
	weight: ["600", "700", "800"],
	variable: "--font-display",
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
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
			className={`h-full ${plexSans.variable} ${bricolage.variable} ${jetbrainsMono.variable}`}
		>
			<body className="font-sans h-full flex flex-col bg-paper text-ink antialiased">
				{children}
				<Analytics />
			</body>
		</html>
	);
}
