/**
 * StatusTicker — glass strip beneath the navbar (signal.dc.html 77-95).
 *
 * Server component. Renders a static SYSTEMS marquee (the system list is a
 * visual element, not live data) and a live Tashkent clock span. The clock is
 * filled in by the `signal-effects` client component via #tashkent-clock.
 */

const SYSTEMS = [
	"eduflow — operational",
	"parking-vision — operational",
	"fiscal-core — operational",
	"process-monitor — operational",
];

// Duplicate the list so the -50% marquee translate loops seamlessly.
const MARQUEE = [...SYSTEMS, ...SYSTEMS];

export default function StatusTicker() {
	return (
		<div className="glass border-b border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,.05)]">
			<div className="mx-auto flex h-10 max-w-[1200px] items-center gap-[18px] overflow-hidden px-5 sm:px-8">
				<span className="shrink-0 font-mono text-[11px] tracking-[.16em] text-accent">
					SYSTEMS
				</span>

				<div
					className="flex-1 overflow-hidden"
					style={{
						maskImage:
							"linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)",
						WebkitMaskImage:
							"linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)",
					}}
				>
					<div className="inline-flex gap-[42px] whitespace-nowrap font-mono text-xs text-[#888E96] animate-sgMarquee">
						{MARQUEE.map((system, i) => (
							<span key={i} className="inline-flex items-center gap-2">
								<span className="h-1.5 w-1.5 rounded-full bg-accent" />
								{system}
							</span>
						))}
					</div>
				</div>

				<span
					id="tashkent-clock"
					className="shrink-0 whitespace-nowrap font-mono text-xs tracking-[.04em] text-accent"
				>
					TASHKENT --:--:--
				</span>
			</div>
		</div>
	);
}
