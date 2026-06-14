import Link from "next/link";
import { getDict } from "~/dict";
import { PropsWithLang } from "~/types";

/**
 * Signal hero (signal.dc.html 97-137).
 *
 * Server component. The grid drift, network canvas, cursor spotlight and the
 * stat counters are progressively enhanced by the `signal-effects` client
 * component, which finds the elements by id:
 *   #hero · #hero-canvas · #hero-spot · #stat-users · #stat-team · #stat-years
 *
 * Counters render their final values as plain textContent so they read
 * correctly with JS disabled; signal-effects animates them when JS runs.
 */
export default async function Header({ lang }: PropsWithLang) {
	const { header } = await getDict(lang);

	return (
		<header id="hero" className="relative overflow-hidden animate-sgUp">
			{/* drifting line grid */}
			<div className="pointer-events-none absolute inset-0 bg-grid opacity-30 animate-sgDrift" />

			{/* architecture network canvas (signal-effects mounts into this) */}
			<canvas
				id="hero-canvas"
				className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
			/>

			{/* amber corner glow */}
			<div
				className="pointer-events-none absolute -right-[140px] -top-[140px] h-[660px] w-[660px]"
				style={{
					background:
						"radial-gradient(circle,rgba(255,194,75,.13),transparent 60%)",
				}}
			/>

			{/* cursor spotlight (signal-effects updates the background) */}
			<div
				id="hero-spot"
				className="pointer-events-none absolute inset-0 transition-[background] duration-200 ease-out"
			/>

			<div className="relative mx-auto grid min-h-[80vh] max-w-[1200px] grid-cols-1 items-center gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.25fr_.9fr]">
				{/* left column */}
				<div>
					{/* kicker glass pill */}
					<div
						className="mb-[30px] inline-flex items-center gap-[9px] rounded-full border border-accent/30 px-[15px] py-[7px] font-mono text-[13px] tracking-[.08em] text-accent shadow-[inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-[14px]"
						style={{
							background:
								"linear-gradient(180deg,rgba(255,194,75,.14),rgba(255,194,75,.04))",
						}}
					>
						<span className="h-2 w-2 rounded-full bg-accent animate-sgPulse" />
						{header.kicker}
					</div>

					<h1 className="m-0 font-display font-extrabold leading-[.88] tracking-[-.04em] text-[clamp(34px,11vw,108px)] break-words">
						MADRIMOV
					</h1>
					<h1 className="mt-1.5 font-display font-light leading-none tracking-[-.01em] text-[#7e848c] text-[clamp(26px,3.6vw,52px)]">
						Xudoshukur
					</h1>

					<p className="mt-8 max-w-[19ch] font-display font-medium leading-[1.25] tracking-[-.02em] text-[clamp(20px,2.1vw,28px)]">
						{header.tagline}
					</p>
					<p className="mb-[34px] mt-5 max-w-[50ch] text-[17px] leading-[1.65] text-muted">
						{header.desc}
					</p>

					<div className="flex flex-wrap gap-[14px]">
						<Link href="#projects" className="btn-amber">
							{header.ctaProjects} <span className="font-mono">→</span>
						</Link>
						<Link href="#contact" className="btn-ghost">
							{header.ctaContact}
						</Link>
					</div>

					{/* stats — values are static fallback; signal-effects animates them */}
					<div className="mt-12 flex gap-11 border-t border-line pt-7">
						<div>
							<div
								id="stat-users"
								className="font-display font-bold leading-none tabular-nums text-accent text-[clamp(34px,4vw,46px)]"
							>
								336+
							</div>
							<div className="mt-[9px] font-mono text-[11px] tracking-[.06em] text-[#888E96]">
								FOYDALANUVCHI
							</div>
						</div>
						<div>
							<div
								id="stat-team"
								className="font-display font-bold leading-none tabular-nums text-[clamp(34px,4vw,46px)]"
							>
								7
							</div>
							<div className="mt-[9px] font-mono text-[11px] tracking-[.06em] text-[#888E96]">
								JAMOA
							</div>
						</div>
						<div>
							<div
								id="stat-years"
								className="font-display font-bold leading-none tabular-nums text-[clamp(34px,4vw,46px)]"
							>
								4+
							</div>
							<div className="mt-[9px] font-mono text-[11px] tracking-[.06em] text-[#888E96]">
								YIL
							</div>
						</div>
					</div>
				</div>

				{/* right column — portrait placeholder */}
				<div className="relative">
					<div
						className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl border border-white/[0.18] shadow-[inset_0_1px_0_rgba(255,255,255,.4),0_30px_70px_-34px_rgba(0,0,0,.8)] backdrop-blur-[30px]"
						style={{
							background:
								"linear-gradient(155deg,rgba(255,255,255,.16),rgba(255,255,255,.04))",
						}}
					>
						<span className="font-mono text-xs text-[#4f545b]">portret · 4:5</span>
						<span className="absolute left-4 top-4 h-9 w-9 border-l-2 border-t-2 border-accent" />
						<span className="absolute bottom-4 right-4 h-9 w-9 border-b-2 border-r-2 border-accent" />
					</div>

					{/* LIVE badge */}
					<div
						className="absolute -right-[14px] top-[18px] inline-flex items-center gap-[7px] rounded-xl border border-white/[0.12] px-[13px] py-[9px] font-mono text-[11px] text-accent shadow-[0_18px_40px_-18px_#000,inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-[18px]"
						style={{
							background:
								"linear-gradient(180deg,rgba(40,44,50,.6),rgba(20,22,26,.45))",
						}}
					>
						<span className="h-1.5 w-1.5 rounded-full bg-accent animate-sgPulse" />
						LIVE
					</div>

					{/* location badge */}
					<div
						className="absolute -bottom-4 -left-4 rounded-[14px] border border-white/[0.12] px-[17px] py-[13px] shadow-[0_22px_46px_-22px_#000,inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-[18px]"
						style={{
							background:
								"linear-gradient(180deg,rgba(40,44,50,.6),rgba(20,22,26,.45))",
						}}
					>
						<div className="font-mono text-[10px] tracking-[.12em] text-[#888E96]">
							BASED IN
						</div>
						<div className="mt-[3px] font-display text-[15px] font-medium">
							Toshkent, UZ
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
