import { getDict } from "~/dict";
import { PropsWithLang } from "~/types";

/**
 * Skills — Signal section (signal.dc.html 170-213).
 *
 * Server component. `id="skills"` is wired to the scroll-reveal
 * IntersectionObserver in signal-effects. A responsive grid of glass panels,
 * one per `skills.groups` entry: a mono uppercase category label and the items
 * rendered as mono tag-pills.
 */
export default async function Skills({ lang }: PropsWithLang) {
	const { skills } = await getDict(lang);

	return (
		<section id="skills" className="relative border-t border-white/6">
			<div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-[88px]">
				<div className="eyebrow mb-5">02 — KO&apos;NIKMALAR</div>
				<h2 className="m-0 mb-11 font-display text-[clamp(30px,4vw,44px)] font-semibold leading-[1.08] tracking-[-.02em] text-balance">
					Texnologiyalar steki
				</h2>

				<div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
					{skills.groups.map((group) => (
						<div
							key={group.category}
							className="glass rounded-[18px] px-[22px] pb-6 pt-[22px]"
						>
							<div className="mb-4 font-mono text-xs uppercase tracking-widest text-[#888E96]">
								{group.category}
							</div>
							<div className="flex flex-wrap gap-2">
								{group.items.map((item) => (
									<span key={item} className="tag-pill">
										{item}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
