import { getPublishedPosts } from "~/lib/notion";
import { SITE_URL, SITE_NAME, isLang } from "~/lib/seo";

export const revalidate = 300;

/** RSS matnida xavfli belgilarni qochirish. */
function esc(s: string): string {
	return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function GET(
	_req: Request,
	{ params }: { params: { lang: string } }
) {
	if (!isLang(params.lang)) return new Response("Not found", { status: 404 });
	const lang = params.lang;
	const posts = await getPublishedPosts(lang);

	const items = posts
		.map((p) => {
			const url = `${SITE_URL}/${lang}/blog/${p.slug}`;
			return `\t\t<item>
\t\t\t<title>${esc(p.title)}</title>
\t\t\t<link>${url}</link>
\t\t\t<guid>${url}</guid>
\t\t\t<description>${esc(p.description)}</description>
\t\t\t<pubDate>${new Date(p.date).toUTCString()}</pubDate>
\t\t</item>`;
		})
		.join("\n");

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
\t<channel>
\t\t<title>${esc(SITE_NAME)} — Blog</title>
\t\t<link>${SITE_URL}/${lang}/blog</link>
\t\t<description>Muhandislik maqolalari — backend, arxitektura, DevOps</description>
\t\t<language>${lang}</language>
${items}
\t</channel>
</rss>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
}
