import Link from "next/link";
import { getDict } from "~/dict";
import { PropsWithLang } from "~/types";
import Reveal from "~/components/reveal/reveal";

export default async function Experience({ lang }: PropsWithLang) {
	const { experience } = await getDict(lang);
	return (
		<section id="experience" className="relative py-20 sm:py-28">
			<div className="mx-auto max-w-5xl px-5">
				<Reveal>
					<span className="section-eyebrow">{experience.eyebrow}</span>
					<h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
						{experience.title}
					</h2>
				</Reveal>

				<div className="mt-12 relative">
					{/* vertical line */}
					<div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-cyan/60 via-accent/40 to-transparent sm:left-[9px]" />

					<div className="flex flex-col gap-8">
						{experience.organizations.map((org, i) => (
							<Reveal key={org.organization} delay={i * 100}>
								<div className="relative pl-8 sm:pl-12">
									{/* dot */}
									<span className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full bg-ink border-2 border-accent shadow-[0_0_0_4px_rgba(225,29,72,0.14)] sm:left-[2px]" />

									<div className="card-surface rounded-2xl p-6">
										<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
											<h3 className="font-display text-xl font-bold text-ink">
												{org.organization}
											</h3>
											<span className="text-xs font-semibold uppercase tracking-wider text-accent-cyan">
												{org.year}
											</span>
										</div>

										<p className="mt-1 text-sm font-semibold text-accent">
											{org.jobTitle}
										</p>
										{org.link ? (
											<Link
												href={`https://${org.link}`}
												target="_blank"
												rel="noopener"
												className="mt-0.5 inline-block text-xs text-soft hover:text-ink transition-colors"
											>
												{org.link} ↗
											</Link>
										) : null}

										<p className="mt-3 text-muted text-sm sm:text-base leading-relaxed">
											{org.desc}
										</p>

										{org.projects && org.projects.length > 0 ? (
											<div className="mt-4 flex flex-wrap gap-2">
												{org.projects.map((p) => (
													<span
														key={p}
														className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-black/[0.02] px-2.5 py-1 text-xs font-medium text-muted"
													>
														<span className="h-1.5 w-1.5 rounded-full bg-accent-fuchsia" />
														{p}
													</span>
												))}
											</div>
										) : null}

										{org.stack && org.stack.length > 0 ? (
											<div className="mt-4 flex flex-wrap gap-2">
												{org.stack.map((s) => (
													<span key={s} className="tech-badge">
														{s}
													</span>
												))}
											</div>
										) : null}
									</div>
								</div>
							</Reveal>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
