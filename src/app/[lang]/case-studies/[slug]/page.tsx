import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "~/components/reveal/reveal";
import JsonLd from "~/components/json-ld/json-ld";
import { getDict } from "~/dict";
import { getProjects, getProjectBySlug, getProjectBlocks } from "~/lib/notion";
import { renderBlocks } from "~/lib/notion-render";
import { Lang } from "~/types";
import {
	SITE_URL,
	SITE_NAME,
	OG_LOCALE,
	PERSON_ID,
	alternates,
	pageUrl,
} from "~/lib/seo";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
	const items = (await getProjects("uz")).filter((p) => p.hasCaseStudy);
	const langs: Lang[] = ["uz", "ru", "en"];
	const out: { lang: string; slug: string }[] = [];
	for (const lang of langs) for (const p of items) out.push({ lang, slug: p.slug });
	return out;
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>;
}) {
	const { lang: langParam, slug } = await params;
	const lang = langParam as Lang;
	const project = await getProjectBySlug(lang, slug);
	// Yo'q slug metadata bosqichida 404 bo'lishi shart (soft-404 oldini olish).
	if (!project || !project.hasCaseStudy) notFound();
	const suffix = `/case-studies/${project.slug}`;
	return {
		title: `${project.title} — Case Study`,
		description: project.description,
		keywords: project.tags,
		alternates: alternates(lang, suffix),
		openGraph: {
			type: "article",
			locale: OG_LOCALE[lang],
			url: pageUrl(lang, suffix),
			title: `${project.title} — Case Study`,
			description: project.description,
			siteName: `${SITE_NAME} Portfolio`,
			images: [{ url: project.cover || "/avatar.jpg", alt: project.title }],
		},
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ lang: string; slug: string }>;
}) {
	const { lang: langParam, slug } = await params;
	const lang = langParam as Lang;
	const project = await getProjectBySlug(lang, slug);
	if (!project || !project.hasCaseStudy) notFound();
	const { ui } = await getDict(lang);
	const blocks = await getProjectBlocks(project.id);
	const suffix = `/case-studies/${project.slug}`;
	const url = pageUrl(lang, suffix);
	const articleLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		"@id": `${url}#article`,
		mainEntityOfPage: url,
		headline: `${project.title} — Case Study`,
		description: project.description,
		inLanguage: lang,
		image: project.cover || `${SITE_URL}/avatar.jpg`,
		keywords: project.tags.join(", "),
		author: { "@type": "Person", "@id": PERSON_ID, name: "Xudoshukur Madrimov" },
		publisher: {
			"@type": "Person",
			"@id": PERSON_ID,
			name: "Xudoshukur Madrimov",
		},
	};
	return (
		<article className="relative mx-auto max-w-3xl px-5 pt-36 pb-24">
			<JsonLd data={articleLd} />
			<Reveal>
				<Link href={`/${lang}/case-studies`} className="section-eyebrow">← {ui.caseStudiesTitle}</Link>
			</Reveal>
			<Reveal delay={80}>
				<span className="mt-6 block text-xs font-bold uppercase tracking-widest text-accent">{project.category}</span>
				<h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">{project.title}</h1>
				<p className="mt-3 text-muted">{project.description}</p>
				<div className="mt-4 flex flex-wrap gap-2">
					{project.tags.map((t) => (<span key={t} className="tech-badge">{t}</span>))}
				</div>
			</Reveal>
			<Reveal delay={160}>
				<div className="prose prose-invert mt-8 max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-strong:text-fg prose-code:text-accent prose-code:before:content-none prose-code:after:content-none prose-pre:bg-surface2 prose-pre:border prose-pre:border-line">
					{renderBlocks(blocks)}
				</div>
			</Reveal>
		</article>
	);
}
