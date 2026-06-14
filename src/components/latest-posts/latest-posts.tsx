import Link from "next/link";
import { getDict } from "~/dict";
import { getPublishedPosts } from "~/lib/notion";
import { formatDate } from "~/lib/format-date";
import { Lang } from "~/types";

/**
 * LatestPosts — Signal blog section (signal.dc.html 313-333).
 *
 * Server component. `id="blog"` is wired to the scroll-reveal observer in
 * signal-effects, so the per-row `<Reveal>` wrapper is dropped (it would double-
 * animate and diverges from the Task 6 timeline). Eyebrow `05 — BLOG`, h2
 * "So'nggi yozuvlar", then blog rows: each is a border-top line with a glass
 * hover background — h3 (Unbounded) + description on the left and the mono date
 * on the right. Keeps `getPublishedPosts(lang)` (Notion + i18n) and `formatDate`.
 *
 * Deviation from the reference: the reference shows "8 MIN · 2026.02"; read-time
 * is not in the Notion data, so only the date (formatDate) is shown. The
 * reference's tag pills are also dropped (rows are h3 + desc + date only).
 * Renders nothing when there are no posts.
 */
export default async function LatestPosts({
	lang,
	limit = 3,
}: {
	lang: Lang;
	limit?: number;
}) {
	const { ui } = await getDict(lang);
	const posts = (await getPublishedPosts(lang)).slice(0, limit);
	if (posts.length === 0) return null;

	return (
		<section
			id="blog"
			className="relative border-t border-white/[0.06] bg-white/[0.014]"
		>
			<div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-[88px]">
				<div className="eyebrow mb-5">05 — BLOG</div>
				<h2 className="m-0 mb-11 font-display text-[clamp(30px,4vw,44px)] font-semibold leading-[1.08] tracking-[-.02em] [text-wrap:balance]">
					So&apos;nggi yozuvlar
				</h2>

				<div className="flex flex-col">
					{posts.map((p, i) => (
						<Link
							key={p.slug}
							href={`/${lang}/blog/${p.slug}`}
							className={`group flex items-baseline justify-between gap-[30px] rounded-[14px] border-t border-line px-[22px] py-[26px] transition-[background,border-color] duration-300 hover:border-transparent hover:bg-white/[0.04] ${
								i === posts.length - 1 ? "border-b" : ""
							}`}
						>
							<div className="max-w-[70ch]">
								<h3 className="m-0 mb-2 font-display text-[22px] font-medium tracking-[-.01em] transition-colors group-hover:text-accent">
									{p.title}
								</h3>
								<p className="m-0 text-[15px] leading-[1.6] text-muted">
									{p.description}
								</p>
							</div>
							<span className="whitespace-nowrap font-mono text-xs text-[#888E96]">
								{formatDate(p.date, lang)}
							</span>
						</Link>
					))}
				</div>

				<div className="mt-9">
					<Link
						href={`/${lang}/blog`}
						className="inline-flex items-center gap-1.5 font-mono text-sm text-accent transition-colors hover:text-fg"
					>
						{ui.blogTitle}
						<span aria-hidden>→</span>
					</Link>
				</div>
			</div>
		</section>
	);
}
