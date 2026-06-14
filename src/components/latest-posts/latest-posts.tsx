import Link from "next/link";
import Reveal from "~/components/reveal/reveal";
import { getDict } from "~/dict";
import { getPublishedPosts } from "~/lib/notion";
import { formatDate } from "~/lib/format-date";
import { Lang } from "~/types";

/** Bosh sahifa uchun eng oxirgi blog postlari (Notion'dan). Post yo'q bo'lsa — render qilinmaydi. */
export default async function LatestPosts({
	lang,
	limit = 3,
}: {
	lang: Lang;
	limit?: number;
}) {
	const { ui } = await getDict(lang);
	const posts = (await getPublishedPosts()).slice(0, limit);
	if (posts.length === 0) return null;

	return (
		<section id="blog" className="relative mx-auto max-w-5xl px-5 py-16">
			<Reveal>
				<span className="section-eyebrow">{ui.blogTitle}</span>
			</Reveal>
			<div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{posts.map((p, i) => (
					<Reveal key={p.slug} delay={i * 80}>
						<Link
							href={`/${lang}/blog/${p.slug}`}
							className="card-surface group flex h-full flex-col rounded-2xl p-6"
						>
							<span className="font-mono text-xs text-soft">
								{formatDate(p.date, lang)}
							</span>
							<h3 className="mt-2 font-display text-lg font-bold text-ink transition-colors group-hover:text-accent">
								{p.title}
							</h3>
							<p className="mt-2 flex-1 text-sm text-muted line-clamp-3">
								{p.description}
							</p>
							<div className="mt-3 flex flex-wrap gap-1.5">
								{p.tags.slice(0, 3).map((t) => (
									<span key={t} className="tech-badge">
										{t}
									</span>
								))}
							</div>
						</Link>
					</Reveal>
				))}
			</div>
			<div className="mt-8 text-center sm:text-left">
				<Link href={`/${lang}/blog`} className="btn-ghost-line">
					{ui.blogTitle}
					<span aria-hidden>→</span>
				</Link>
			</div>
		</section>
	);
}
