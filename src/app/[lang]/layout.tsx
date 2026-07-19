import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Aurora from "~/components/aurora/aurora";
import Footer from "~/components/footer/footer";
import Navbar from "~/components/navbar/navbar";
import { getDict } from "~/dict";
import { Lang } from "~/types";
import { SITE_URL, SITE_NAME, OG_LOCALE, isLang } from "~/lib/seo";

/**
 * Til bo'yicha sayt-darajasidagi standart metadata.
 * MUHIM: bu yerda `alternates`/canonical YO'Q — har sahifa o'zining
 * canonical + hreflang'ini beradi (umumiy canonical butun saytni noto'g'ri
 * canonicalizatsiya qilib, indeksdan chiqarib yuborardi).
 * `openGraph.url` ham bu yerda yo'q — har sahifa o'zi beradi.
 */
export async function generateMetadata(
    props: {
        params: Promise<{ lang: string }>;
    }
): Promise<Metadata> {
    const params = await props.params;
    if (!isLang(params.lang)) return {};
    const { header, work } = await getDict(params.lang);
    return {
		metadataBase: new URL(SITE_URL),
		title: {
			default: `${header.name} — ${header.jobTitle}`,
			template: `%s | ${SITE_NAME}`,
		},
		description: work.desc,
		manifest: "/site.webmanifest",
		openGraph: {
			type: "website",
			locale: OG_LOCALE[params.lang],
			siteName: `${SITE_NAME} Portfolio`,
			images: [{ url: "/avatar.jpg", alt: `${SITE_NAME} Portfolio` }],
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
}

export default async function RootLayout(
    props: Readonly<{
        params: Promise<{
            lang: string;
        }>;
        children: React.ReactNode;
    }>
) {
    const params = await props.params;

    const {
        children
    } = props;

    // Yaroqsiz til — toza 404 (soft-404 / cheksiz URL fazosini oldini oladi).
    if (!isLang(params.lang)) notFound();
    const dict = await getDict(params.lang as Lang);
    return (
		<div className="flex min-h-full flex-col">
			<Aurora />
			<Navbar items={dict.menu} />
			<main className="grow w-full">{children}</main>
			<Footer />
		</div>
	);
}
