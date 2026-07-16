import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "~/components/reveal/reveal";
import JsonLd from "~/components/json-ld/json-ld";
import TelegramCta from "~/components/telegram-cta/telegram-cta";
import { getDict } from "~/dict";
import { getPublishedPosts, getPostBySlug, getBlocks } from "~/lib/notion";
import { renderBlocks } from "~/lib/notion-render";
import { formatDate } from "~/lib/format-date";
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
	const posts = await getPublishedPosts("uz");
	const langs: Lang[] = ["uz", "ru", "en"];
	const out: { lang: string; slug: string }[] = [];
	for (const lang of langs) for (const p of posts) out.push({ lang, slug: p.slug });
	return out;
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }) {
	const lang = params.lang as Lang;
	const post = await getPostBySlug(lang, params.slug);
	if (!post) return {};
	const suffix = `/blog/${post.slug}`;
	return {
		title: post.title,
		description: post.description,
		keywords: post.tags,
		alternates: alternates(lang, suffix),
		openGraph: {
			type: "article",
			locale: OG_LOCALE[lang],
			url: pageUrl(lang, suffix),
			title: post.title,
			description: post.description,
			siteName: `${SITE_NAME} Portfolio`,
			publishedTime: post.date,
			authors: ["Xudoshukur Madrimov"],
			tags: post.tags,
			images: [{ url: "/avatar.jpg", alt: post.title }],
		},
	};
}

export default async function PostPage({
	params,
}: {
	params: { lang: string; slug: string };
}) {
	const lang = params.lang as Lang;
	const post = await getPostBySlug(lang, params.slug);
	if (!post) notFound();
	const { ui } = await getDict(lang);
	const blocks = await getBlocks(post.id);

	const suffix = `/blog/${post.slug}`;
	const url = pageUrl(lang, suffix);
	const articleLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"@id": `${url}#article`,
		mainEntityOfPage: url,
		headline: post.title,
		description: post.description,
		inLanguage: lang,
		datePublished: post.date,
		dateModified: post.date,
		image: `${SITE_URL}/avatar.jpg`,
		keywords: post.tags.join(", "),
		author: { "@type": "Person", "@id": PERSON_ID, name: "Xudoshukur Madrimov" },
		publisher: {
			"@type": "Person",
			"@id": PERSON_ID,
			name: "Xudoshukur Madrimov",
		},
	};

	return (
		<article className="relative mx-auto max-w-2xl px-5 pt-36 pb-24">
			<JsonLd data={articleLd} />
			<Reveal>
				<Link href={`/${lang}/blog`} className="section-eyebrow">
					← {ui.blogTitle}
				</Link>
			</Reveal>
			<Reveal delay={80}>
				<span className="mt-6 block font-mono text-xs text-soft">
					{formatDate(post.date, lang)}
				</span>
				<h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-ink">
					{post.title}
				</h1>
				<div className="mt-4 flex flex-wrap gap-1.5">
					{post.tags.map((t) => (
						<span key={t} className="tech-badge">{t}</span>
					))}
				</div>
			</Reveal>
			<Reveal delay={160}>
				<div className="prose prose-invert mt-8 max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-strong:text-fg prose-code:text-accent prose-code:before:content-none prose-code:after:content-none prose-pre:bg-surface2 prose-pre:border prose-pre:border-line">
					{renderBlocks(blocks)}
				</div>
			</Reveal>
			<Reveal delay={220}>
				<TelegramCta lang={lang} />
			</Reveal>
		</article>
	);
}
