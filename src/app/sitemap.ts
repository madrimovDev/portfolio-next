import { MetadataRoute } from "next";
import { getPublishedPosts, getProjects } from "~/lib/notion";
import { SITE_URL, LOCALES } from "~/lib/seo";

export const revalidate = 300;

/**
 * Dinamik sitemap — barcha statik sahifalar + Notion'dagi bloglar va
 * case-study'lar, uchala til uchun. hreflang har sahifaning <head>'ida
 * (metadata.alternates) beriladi — Google uchun shu yetarli.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getPublishedPosts("uz"); // uz fallback -> barcha noyob slug'lar
	const caseStudies = (await getProjects("uz")).filter((p) => p.hasCaseStudy);

	const entries: MetadataRoute.Sitemap = [];

	const push = (suffix: string, lastModified?: string) => {
		for (const lang of LOCALES) {
			entries.push({
				url: `${SITE_URL}/${lang}${suffix}`,
				...(lastModified ? { lastModified: new Date(lastModified) } : {}),
			});
		}
	};

	// Statik sahifalar
	for (const s of ["", "/blog", "/case-studies", "/portfolio"]) push(s);

	// Bloglar — lastmod sifatida Notion'dagi oxirgi tahrir vaqti aniqroq
	for (const p of posts) push(`/blog/${p.slug}`, p.lastEdited || p.date);

	// Case-study'lar
	for (const c of caseStudies) push(`/case-studies/${c.slug}`);

	return entries;
}
