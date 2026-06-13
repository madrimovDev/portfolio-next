import { PropsWithLang } from "~/types";
import PortfolioCard from "./portfolio-card";
import { getDict } from "~/dict";
import Reveal from "~/components/reveal/reveal";

export default async function Portfolio({
	lang,
	limit,
	standalone = false,
}: PropsWithLang & { limit?: number; standalone?: boolean }) {
	const { portfolio, ui } = await getDict(lang);
	const projects =
		typeof limit === "number"
			? portfolio.projects.slice(0, limit)
			: portfolio.projects;

	return (
		<section
			id="projects"
			className={`relative ${standalone ? "pt-36 pb-24" : "py-20 sm:py-28"}`}
		>
			<div className="mx-auto max-w-5xl px-5">
				<Reveal>
					<span className="section-eyebrow">{portfolio.eyebrow}</span>
					<h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
						{portfolio.title}
					</h2>
					<p className="mt-3 max-w-2xl text-muted">{portfolio.subtitle}</p>
				</Reveal>

				<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{projects.map((project, i) => (
						<Reveal key={project.title} delay={(i % 3) * 90}>
							<PortfolioCard project={project} ui={ui} lang={lang} />
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
