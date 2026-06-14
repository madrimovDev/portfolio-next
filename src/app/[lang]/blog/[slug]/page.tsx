import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "~/components/reveal/reveal";
import { getDict } from "~/dict";
import { getPostBySlug, getAllPostSlugs } from "~/lib/blog";
import { formatDate } from "~/lib/format-date";
import { Lang } from "~/types";

export function generateStaticParams() {
	const langs: Lang[] = ["uz", "ru", "en"];
	const out: { lang: string; slug: string }[] = [];
	for (const lang of langs) {
		for (const slug of getAllPostSlugs()) out.push({ lang, slug });
	}
	return out;
}

export const dynamicParams = false;

export function generateMetadata({ params }: { params: { slug: string } }) {
	const post = getPostBySlug(params.slug);
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
	const post = getPostBySlug(params.slug);
	if (!post) notFound();
	const { ui } = await getDict(lang);

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
						<span key={t} className="tech-badge">
							{t}
						</span>
					))}
				</div>
			</Reveal>
			<Reveal delay={160}>
				<div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-strong:text-ink prose-code:text-accent prose-code:before:content-none prose-code:after:content-none">
					{post.body}
				</div>
			</Reveal>
		</article>
	);
}
