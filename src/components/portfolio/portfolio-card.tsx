import Image from "next/image";
import Link from "next/link";
import { ProjectMeta } from "~/lib/notion";
import { Dict } from "~/dict";
import { Lang } from "~/types";

/**
 * PortfolioCard — Signal glass project card (signal.dc.html 255-307).
 *
 * Cover area (Notion `cover` image via next/image fill, OR amber Unbounded
 * initials on a faint glass gradient when there is no cover) carrying a mono
 * PRIVATE pill when `project.private`. Below: h3 (Unbounded), description and
 * mono tag-pills. Hover lifts the card (-3px) and warms the border.
 *
 * Deviation from the reference: the reference's "metrics strip" (p95 84ms,
 * 336+ users …) is omitted — there is no Notion property backing it. The
 * reference's unconditional LIVE badge is also dropped: only PRIVATE is data-
 * backed (`project.private`). The case-study / external link logic is kept.
 */
export default function PortfolioCard({
	project,
	ui,
	lang,
}: {
	project: ProjectMeta;
	ui: Dict["Index"]["ui"];
	lang: Lang;
}) {
	const initials = project.title
		.replace(/[^A-Za-zА-Яа-я0-9 ]/g, "")
		.split(" ")
		.slice(0, 2)
		.map((w) => w.charAt(0))
		.join("")
		.toUpperCase();

	return (
		<div className="glass-strong group flex h-full flex-col overflow-hidden rounded-[20px] transition-[transform,border-color,box-shadow] duration-300 hover:translate-y-[-3px] hover:border-white/20">
			{/* cover area: Notion image OR amber initials on faint glass */}
			<div className="relative flex h-[168px] items-center justify-center overflow-hidden border-b border-white/8 bg-[linear-gradient(155deg,rgba(255,255,255,.08),rgba(255,255,255,.02))]">
				{project.cover ? (
					<Image
						src={project.cover}
						alt={project.title}
						fill
						className="object-cover"
						sizes="(max-width:768px) 100vw, 33vw"
					/>
				) : (
					<span className="font-display text-[52px] font-bold text-accent">
						{initials}
					</span>
				)}
				{project.private ? (
					<span className="absolute right-3.5 top-3.5 rounded-full border border-line3 px-[9px] py-1 font-mono text-[10px] uppercase tracking-widest text-muted">
						{ui.private}
					</span>
				) : null}
			</div>

			<div className="flex flex-1 flex-col px-[22px] pb-6 pt-[22px]">
				<h3 className="m-0 mb-2 font-display text-xl font-medium">
					{project.title}
				</h3>
				<p className="m-0 mb-3.5 flex-1 text-sm leading-[1.6] text-muted">
					{project.description}
				</p>

				<div className="flex flex-wrap gap-[7px]">
					{project.tags.map((tag) => (
						<span key={tag} className="tag-pill">
							{tag}
						</span>
					))}
				</div>

				{project.hasCaseStudy ? (
					<Link
						href={`/${lang}/case-studies/${project.slug}`}
						className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-accent transition-colors hover:text-fg"
					>
						{ui.caseStudy}
						<span aria-hidden>→</span>
					</Link>
				) : project.link ? (
					<Link
						href={project.link}
						target="_blank"
						rel="noopener"
						className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-accent transition-colors hover:text-fg"
					>
						{ui.visit}
						<span aria-hidden>↗</span>
					</Link>
				) : null}
			</div>
		</div>
	);
}
