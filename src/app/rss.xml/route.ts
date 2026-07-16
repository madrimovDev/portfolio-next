import { SITE_URL, DEFAULT_LOCALE } from "~/lib/seo";

/** /rss.xml → mahalliy-birinchi: /uz/rss.xml (middleware nuqtali yo'llarni o'tkazib yuboradi). */
export function GET() {
	return Response.redirect(`${SITE_URL}/${DEFAULT_LOCALE}/rss.xml`, 308);
}
