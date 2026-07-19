import { getDict } from "~/dict";
import { PropsWithLang } from "~/types";

/**
 * About — Signal section (signal.dc.html 149-168).
 *
 * Server component. `id="about"` is wired to the scroll-reveal
 * IntersectionObserver in signal-effects. Two-column layout: balanced Unbounded
 * heading + two body paragraphs (from dict `work.desc`, split on the sentence
 * boundary), and a right STATUS glass card with mono key/value rows.
 */
export default async function MyWork({ lang }: PropsWithLang) {
	const { work } = await getDict(lang);

	// `work.desc` is a single localized string; split into two balanced
	// paragraphs at a sentence boundary (period + whitespace holds for uz/ru/en).
	const sentences = work.desc.split(/(?<=\.)\s+/).filter(Boolean);
	const mid = Math.ceil(sentences.length / 2);
	const para1 = sentences.slice(0, mid).join(" ");
	const para2 = sentences.slice(mid).join(" ");

	const status: Array<{ label: string; value: string; live?: boolean }> = [
		{ label: "Rol", value: "Team Lead" },
		{ label: "Joylashuv", value: "Toshkent, UZ" },
		{ label: "Fokus", value: "Gov / Enterprise" },
		{ label: "Holat", value: "Loyihaga ochiq", live: true },
	];

	return (
		<section
			id="about"
			className="relative border-t border-white/6 bg-white/[0.014]"
		>
			<div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-10 px-5 py-20 sm:px-8 sm:py-[88px] lg:grid-cols-[1.4fr_1fr] lg:gap-14">
				{/* left — eyebrow + heading + paragraphs */}
				<div>
					<div className="eyebrow mb-5">01 — MEN HAQIMDA</div>
					<h2 className="m-0 font-display text-[clamp(30px,4vw,44px)] font-semibold leading-[1.08] tracking-[-.02em] text-balance">
						Jiddiy tizimlarni
						<br />
						ishonchli qilib quraman
					</h2>
					<p className="mb-[18px] mt-6 max-w-[60ch] text-[17px] leading-[1.75] text-[#c2c6cb]">
						{para1}
					</p>
					{para2 ? (
						<p className="m-0 max-w-[60ch] text-[17px] leading-[1.75] text-[#c2c6cb]">
							{para2}
						</p>
					) : null}
				</div>

				{/* right — STATUS glass card */}
				<div className="glass-strong rounded-[20px] px-[30px] py-7">
					<div className="mb-5 font-mono text-[11px] tracking-[.12em] text-[#888E96]">
						STATUS
					</div>
					<div className="flex flex-col gap-4">
						{status.map((row, i) => (
							<div
								key={row.label}
								className={`flex items-baseline justify-between ${
									i < status.length - 1
										? "border-b border-line pb-3.5"
										: ""
								}`}
							>
								<span className="text-sm text-muted">{row.label}</span>
								{row.live ? (
									<span className="inline-flex items-center gap-[7px] font-mono text-[13px] text-accent">
										<span className="h-[7px] w-[7px] rounded-full bg-accent" />
										{row.value}
									</span>
								) : (
									<span className="font-mono text-sm">{row.value}</span>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
