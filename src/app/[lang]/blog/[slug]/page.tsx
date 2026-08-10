import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "~/components/reveal/reveal";
import JsonLd from "~/components/json-ld/json-ld";
import TelegramCta from "~/components/telegram-cta/telegram-cta";
import RelatedPosts from "~/components/related-posts/related-posts";
import PostInteractionsProvider from "~/components/post-interactions/post-interactions-provider";
import ViewCount from "~/components/post-interactions/view-count";
import ClapButton from "~/components/post-interactions/clap-button";
import Comments from "~/components/comments/comments";
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

export async function generateMetadata(props: { params: Promise<{ lang: string; slug: string }> }) {
    const params = await props.params;
    const lang = params.lang as Lang;
    const post = await getPostBySlug(lang, params.slug);
    // Yo'q slug metadata bosqichida 404 bo'lishi shart — aks holda streaming
    // boshlanib, status 200 + layout'ning "index, follow" robots'i ketadi (soft-404).
    if (!post) notFound();
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
			modifiedTime: post.lastEdited || post.date,
			authors: ["Xudoshukur Madrimov"],
			tags: post.tags,
		},
	};
}

export default async function PostPage(
    props: {
        params: Promise<{ lang: string; slug: string }>;
    }
) {
    const params = await props.params;
    const lang = params.lang as Lang;
    const post = await getPostBySlug(lang, params.slug);
    if (!post) notFound();
    const { ui } = await getDict(lang);
    const blocks = await getBlocks(post.id);

    const suffix = `/blog/${post.slug}`;
    const url = pageUrl(lang, suffix);
    const breadcrumbLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/${lang}` },
			{ "@type": "ListItem", position: 2, name: ui.blogTitle, item: `${SITE_URL}/${lang}/blog` },
			{ "@type": "ListItem", position: 3, name: post.title, item: url },
		],
	};
    const articleLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		"@id": `${url}#article`,
		mainEntityOfPage: url,
		headline: post.title,
		description: post.description,
		inLanguage: lang,
		datePublished: post.date,
		dateModified: post.lastEdited || post.date,
		image: `${url}/opengraph-image`,
		keywords: post.tags.join(", "),
		author: { "@type": "Person", "@id": PERSON_ID, name: "Xudoshukur Madrimov" },
		publisher: {
			"@type": "Person",
			"@id": PERSON_ID,
			name: "Xudoshukur Madrimov",
		},
	};

    return (
		<PostInteractionsProvider slug={post.slug}>
			<article className="relative mx-auto max-w-2xl px-5 pt-36 pb-24">
				<JsonLd data={articleLd} />
				<JsonLd data={breadcrumbLd} />
				<Reveal>
					<Link href={`/${lang}/blog`} className="section-eyebrow">
						← {ui.blogTitle}
					</Link>
				</Reveal>
				<Reveal delay={80}>
					<div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
						<span className="font-mono text-xs text-soft">
							{formatDate(post.date, lang)}
						</span>
						<span className="font-mono text-xs text-soft">·</span>
						<ViewCount label={ui.views} />
					</div>
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
				<Reveal delay={180}>
					<ClapButton hint={ui.clapHint} />
				</Reveal>
				{/*
				  Suspense: fikrlar Supabase'dan keladi. Usiz sekin (yoki
				  timeout'gacha osilgan) Supabase butun HTML'ni to'sib turardi —
				  har bir o'quvchi maqolani ko'rishdan oldin 5 sekundgacha kutardi.
				  Streaming bilan maqola darrov chiqadi, fikrlar keyin ulanadi;
				  ular baribir server HTML'ida bo'ladi, ya'ni SEO saqlanadi.
				*/}
				<Reveal delay={200}>
					<Suspense fallback={<div className="mt-16 h-40" aria-hidden="true" />}>
						<Comments lang={lang} slug={post.slug} />
					</Suspense>
				</Reveal>
				<Reveal delay={220}>
					<RelatedPosts lang={lang} currentSlug={post.slug} tags={post.tags} />
				</Reveal>
				<Reveal delay={240}>
					<TelegramCta lang={lang} />
				</Reveal>
			</article>
		</PostInteractionsProvider>
	);
}
