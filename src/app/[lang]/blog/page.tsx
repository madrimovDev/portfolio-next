import Link from "next/link";
import Reveal from "~/components/reveal/reveal";
import { getDict } from "~/dict";
import { getPublishedPosts } from "~/lib/notion";
import { PropsWithParams, Lang } from "~/types";
import { formatDate } from "~/lib/format-date";

export const revalidate = 300;

export default async function BlogPage({ params }: PropsWithParams) {
	const lang = params.lang as Lang;
	const { ui } = await getDict(lang);
	const posts = await getPublishedPosts(lang);
	return (
		<section className="relative mx-auto max-w-3xl px-5 pt-36 pb-24">
			<Reveal>
				<span className="section-eyebrow">{ui.blogTitle}</span>
			</Reveal>
			<div className="mt-8 flex flex-col divide-y divide-line">
				{posts.map((p, i) => (
					<Reveal key={p.slug} delay={i * 80}>
						<Link href={`/${lang}/blog/${p.slug}`} className="group block py-7">
							<span className="font-mono text-xs text-soft">
								{formatDate(p.date, lang)}
							</span>
							<h2 className="mt-2 font-display text-2xl font-bold text-ink transition-colors group-hover:text-accent">
								{p.title}
							</h2>
							<p className="mt-2 text-muted">{p.description}</p>
							<div className="mt-3 flex flex-wrap gap-1.5">
								{p.tags.map((t) => (
									<span key={t} className="tech-badge">{t}</span>
								))}
							</div>
						</Link>
					</Reveal>
				))}
			</div>
		</section>
	);
}
