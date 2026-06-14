import Link from "next/link";
import { PropsWithLang } from "~/types";
import PortfolioCard from "./portfolio-card";
import { getDict } from "~/dict";
import { getProjects } from "~/lib/notion";

/**
 * Portfolio — Signal projects section (signal.dc.html 243-311).
 *
 * Server component. `id="projects"` is wired to the scroll-reveal observer in
 * signal-effects, so the per-card `<Reveal>` wrapper is dropped (it would
 * double-animate and diverges from the Task 6 timeline). Eyebrow
 * `04 — LOYIHALAR`, h2 "Tanlangan ishlar", a "Barchasi →" link (homepage teaser
 * only — hidden when `standalone`, since that is the all-projects page itself)
 * and a 3-column glass-card grid. Keeps `getProjects(lang)` (Notion + i18n) and
 * the `limit` prop.
 */
export default async function Portfolio({
	lang,
	limit,
	standalone = false,
}: PropsWithLang & { limit?: number; standalone?: boolean }) {
	const { ui } = await getDict(lang);
	let projects = await getProjects(lang);
	if (typeof limit === "number") projects = projects.slice(0, limit);

	return (
		<section
			id="projects"
			className={`relative border-t border-white/[0.06] ${
				standalone ? "pt-36" : ""
			}`}
		>
			<div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-[88px]">
				<div className="mb-11 flex flex-wrap items-end justify-between gap-4">
					<div>
						<div className="eyebrow mb-5">04 — LOYIHALAR</div>
						<h2 className="m-0 font-display text-[clamp(30px,4vw,44px)] font-semibold leading-[1.08] tracking-[-.02em] [text-wrap:balance]">
							Tanlangan ishlar
						</h2>
					</div>
					{!standalone ? (
						<Link
							href={`/${lang}/portfolio`}
							className="font-mono text-sm text-accent transition-colors hover:text-fg"
						>
							Barchasi →
						</Link>
					) : null}
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{projects.map((project) => (
						<PortfolioCard
							key={project.slug}
							project={project}
							ui={ui}
							lang={lang}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
