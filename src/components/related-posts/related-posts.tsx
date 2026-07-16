import Link from "next/link";
import { getDict } from "~/dict";
import { getPublishedPosts } from "~/lib/notion";
import { formatDate } from "~/lib/format-date";
import { Lang } from "~/types";

/**
 * O'xshash maqolalar — teglar kesishuvi bo'yicha eng yaqin 3 ta post
 * (kesishuv bo'lmasa eng yangilari). Ichki bog'lanish: crawler mavzu
 * klasterini ko'radi, o'quvchi saytda qoladi.
 */
export default async function RelatedPosts({
	lang,
	currentSlug,
	tags,
}: {
	lang: Lang;
	currentSlug: string;
	tags: string[];
}) {
	const posts = (await getPublishedPosts(lang)).filter(
		(p) => p.slug !== currentSlug
	);
	if (posts.length === 0) return null;

	const tagSet = new Set(tags);
	const related = posts
		.map((p) => ({ p, score: p.tags.filter((t) => tagSet.has(t)).length }))
		.sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
		.slice(0, 3)
		.map(({ p }) => p);

	const { ui } = await getDict(lang);

	return (
		<div className="mt-12 border-t border-line pt-8">
			<h2 className="m-0 font-mono text-xs tracking-[.12em] text-soft uppercase">
				{ui.relatedTitle}
			</h2>
			<ul className="mt-4 space-y-1 list-none p-0">
				{related.map((p) => (
					<li key={p.slug}>
						<Link
							href={`/${lang}/blog/${p.slug}`}
							className="group flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-lg px-3 py-2.5 -mx-3 transition-colors hover:bg-white/[0.04]"
						>
							<span className="font-display font-semibold text-fg group-hover:text-accent transition-colors">
								{p.title}
							</span>
							<span className="font-mono text-xs text-soft">
								{formatDate(p.date, lang)}
							</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
