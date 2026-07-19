import Link from "next/link";
import { getDict } from "~/dict";
import { PropsWithLang } from "~/types";

/**
 * Experience — Signal timeline (signal.dc.html 215-241).
 *
 * Server component. `id="experience"` is wired to the scroll-reveal
 * IntersectionObserver in signal-effects. A left-border timeline of glass
 * cards; each card carries a node dot — amber for the first (current) role,
 * slate for the rest — the role (Unbounded), the year (mono, amber on the
 * first card only), the organization and a description.
 *
 * Deviation from the reference: the reference cards show only role/year/org/
 * desc. The dict provides `stack` / `projects` per organization, so those are
 * rendered as mono tag-pills under the description rather than dropped.
 */
export default async function Experience({ lang }: PropsWithLang) {
	const { experience } = await getDict(lang);

	return (
		<section
			id="experience"
			className="relative border-t border-white/6 bg-white/[0.014]"
		>
			<div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-[88px]">
				<div className="eyebrow mb-5">03 — TAJRIBA</div>
				<h2 className="m-0 mb-[52px] font-display text-[clamp(30px,4vw,44px)] font-semibold leading-[1.08] tracking-[-.02em] text-balance">
					Yo&apos;l xaritasi
				</h2>

				<div className="ml-1.5 flex flex-col border-l border-line2">
					{experience.organizations.map((org, i) => {
						const isFirst = i === 0;
						const isLast = i === experience.organizations.length - 1;
						return (
							<div
								key={org.organization}
								className={`glass relative ml-[22px] rounded-[18px] px-[26px] py-[22px] ${
									isLast ? "" : "mb-[18px]"
								}`}
							>
								{/* node dot */}
								<span
									className={`absolute left-[-29px] top-[26px] h-[13px] w-[13px] rounded-full shadow-[0_0_0_4px_#0E1013] ${
										isFirst ? "bg-accent" : "bg-line3"
									}`}
								/>

								<div className="mb-2 flex flex-wrap justify-between gap-2">
									<span className="font-display text-xl font-medium">
										{org.jobTitle}
									</span>
									<span
										className={`font-mono text-[13px] ${
											isFirst ? "text-accent" : "text-[#888E96]"
										}`}
									>
										{org.year}
									</span>
								</div>

								<div className="mb-3 text-sm text-[#888E96]">
									{org.link ? (
										<Link
											href={`https://${org.link}`}
											target="_blank"
											rel="noopener"
											className="transition-colors hover:text-fg"
										>
											{org.organization} ↗
										</Link>
									) : (
										org.organization
									)}
								</div>

								<p className="m-0 max-w-[70ch] text-base leading-[1.7] text-[#c2c6cb]">
									{org.desc}
								</p>

								{org.projects && org.projects.length > 0 ? (
									<div className="mt-4 flex flex-wrap gap-2">
										{org.projects.map((p) => (
											<span key={p} className="tag-pill">
												{p}
											</span>
										))}
									</div>
								) : null}

								{org.stack && org.stack.length > 0 ? (
									<div className="mt-2.5 flex flex-wrap gap-2">
										{org.stack.map((s) => (
											<span key={s} className="tag-pill">
												{s}
											</span>
										))}
									</div>
								) : null}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
