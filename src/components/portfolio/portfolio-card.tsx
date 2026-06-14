import Link from "next/link";
import { Dict } from "~/dict";
import { Lang } from "~/types";

const GRADIENTS: Record<string, string> = {
	aurora: "from-[#22d3ee] via-[#6366f1] to-[#8b5cf6]",
	ocean: "from-[#0ea5e9] via-[#2563eb] to-[#4f46e5]",
	candy: "from-[#f472b6] via-[#e879f9] to-[#a855f7]",
	ember: "from-[#fb7185] via-[#f97316] to-[#f59e0b]",
	sunset: "from-[#f59e0b] via-[#ec4899] to-[#8b5cf6]",
	forest: "from-[#34d399] via-[#10b981] to-[#0891b2]",
	steel: "from-[#94a3b8] via-[#64748b] to-[#475569]",
};

export default function PortfolioCard({
	project,
	ui,
	lang,
}: {
	project: Dict["Index"]["portfolio"]["projects"][number];
	ui: Dict["Index"]["ui"];
	lang: Lang;
}) {
	const grad = GRADIENTS[project.gradient] ?? GRADIENTS.aurora;
	const initials = project.title
		.replace(/[^A-Za-zА-Яа-я0-9 ]/g, "")
		.split(" ")
		.slice(0, 2)
		.map((w) => w.charAt(0))
		.join("")
		.toUpperCase();

	return (
		<div className="card-surface group flex h-full flex-col overflow-hidden rounded-2xl">
			{/* Gradient cover */}
			<div className={`relative h-36 overflow-hidden bg-gradient-to-br ${grad}`}>
				<div className="absolute inset-0 bg-grid opacity-30 mix-blend-overlay" />
				<div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
				<span className="absolute left-4 top-4 font-display text-3xl font-bold text-white/90 drop-shadow">
					{initials}
				</span>
				{project.private ? (
					<span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-3 w-3"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2v-9a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm3 8H9V6a3 3 0 016 0v3z" />
						</svg>
						{ui.private}
					</span>
				) : null}
			</div>

			<div className="flex flex-1 flex-col p-5">
				<h3 className="font-display text-lg font-bold text-white">
					{project.title}
				</h3>
				<p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
					{project.description}
				</p>

				<div className="mt-4 flex flex-wrap gap-1.5">
					{project.tags.map((tag) => (
						<span key={tag} className="tech-badge">
							{tag}
						</span>
					))}
				</div>

				{project.link ? (
					<Link
						href={project.link}
						target="_blank"
						rel="noopener"
						className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-cyan hover:text-white transition-colors"
					>
						{ui.visit}
						<span aria-hidden>↗</span>
					</Link>
				) : null}

				{project.caseStudy && (
					<Link
						href={`/${lang}/case-studies/${project.slug}`}
						className="mt-3 inline-block text-sm font-medium text-accent-fuchsia"
					>
						{ui.caseStudy} →
					</Link>
				)}
			</div>
		</div>
	);
}
