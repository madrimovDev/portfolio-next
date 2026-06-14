import { getDict } from "~/dict";
import { PropsWithLang } from "~/types";
import Reveal from "~/components/reveal/reveal";

const GROUP_ACCENT = [
	"from-accent-cyan/20 to-accent-cyan/0 text-accent-cyan",
	"from-accent/20 to-accent/0 text-accent",
	"from-accent-fuchsia/20 to-accent-fuchsia/0 text-accent-fuchsia",
	"from-accent-indigo/20 to-accent-indigo/0 text-accent-indigo",
];

export default async function Skills({ lang }: PropsWithLang) {
	const { skills } = await getDict(lang);
	return (
		<section id="skills" className="relative py-20 sm:py-28">
			<div className="mx-auto max-w-5xl px-5">
				<Reveal>
					<span className="section-eyebrow">{skills.eyebrow}</span>
					<h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
						{skills.title}
					</h2>
				</Reveal>

				<div className="mt-10 grid gap-5 sm:grid-cols-2">
					{skills.groups.map((group, i) => (
						<Reveal key={group.category} delay={i * 90}>
							<div className="card-surface h-full rounded-2xl p-6">
								<div className="flex items-center gap-3">
									<span
										className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${
											GROUP_ACCENT[i % GROUP_ACCENT.length]
										} font-display font-bold`}
									>
										{group.category.charAt(0)}
									</span>
									<h3 className="font-display text-lg font-semibold text-ink">
										{group.category}
									</h3>
								</div>
								<div className="mt-5 flex flex-wrap gap-2">
									{group.items.map((item) => (
										<span key={item} className="tech-badge">
											{item}
										</span>
									))}
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
