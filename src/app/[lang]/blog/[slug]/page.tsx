import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "~/components/reveal/reveal";
import { getDict } from "~/dict";
import { getPublishedPosts, getPostBySlug, getBlocks } from "~/lib/notion";
import { renderBlocks } from "~/lib/notion-render";
import { formatDate } from "~/lib/format-date";
import { Lang } from "~/types";

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
	const post = await getPostBySlug(params.lang as Lang, params.slug);
	if (!post) return {};
	return {
		title: `${post.title} | Madrimov Xudoshukur`,
		description: post.description,
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

	return (
		<article className="relative mx-auto max-w-2xl px-5 pt-36 pb-24">
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
				<div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-strong:text-ink prose-code:text-accent prose-code:before:content-none prose-code:after:content-none">
					{renderBlocks(blocks)}
				</div>
			</Reveal>
		</article>
	);
}
