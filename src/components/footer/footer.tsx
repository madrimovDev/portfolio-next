import Link from "next/link";

/**
 * Footer — Signal contact footer (signal.dc.html 335-355).
 *
 * `id="contact"` is wired to the scroll-reveal observer in signal-effects.
 * A giant faint `madrimov.uz` watermark (Unbounded 800) sits behind the
 * content; `overflow-hidden` keeps the clamp(80–228px) text from causing
 * horizontal scroll. Above it: h2 "Keling, jiddiy tizim quramiz" and an amber
 * mailto CTA, then a bottom row with the MX amber logo, the copyright and mono
 * social links.
 *
 * Deviations from the reference: the email is `madrimov5014@gmail.com` (not the
 * reference's hi@madrimov.uz) and the socials are GitHub / Telegram / Email
 * (the reference's LinkedIn is dropped — no URL exists). These match the
 * project's real contact data, per Task 8.
 */
const SOCIALS = [
	{ label: "GitHub", href: "https://github.com/madrimovDev" },
	{ label: "Telegram", href: "https://t.me/madrimov" },
	{ label: "Email", href: "mailto:madrimov5014@gmail.com" },
];

export default function Footer() {
	return (
		<footer
			id="contact"
			className="relative overflow-hidden border-t border-line"
		>
			{/* giant watermark */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 bottom-[-2.2vw] whitespace-nowrap text-center font-display text-[clamp(80px,16vw,228px)] font-extrabold leading-[.8] tracking-[-.04em] text-white/[0.022]"
			>
				madrimov.uz
			</div>

			<div className="relative z-[1] mx-auto max-w-[1200px] px-5 pb-10 pt-[90px] sm:px-8">
				<div className="flex flex-wrap items-end justify-between gap-10 border-b border-line pb-16">
					<h2 className="m-0 max-w-[14ch] font-display text-[clamp(34px,5.5vw,68px)] font-bold leading-none tracking-[-.025em]">
						Keling, jiddiy
						<br />
						tizim quramiz
					</h2>
					<a href="mailto:madrimov5014@gmail.com" className="btn-amber">
						madrimov5014@gmail.com
						<span className="font-mono" aria-hidden>
							→
						</span>
					</a>
				</div>

				<div className="flex flex-wrap items-center justify-between gap-6 pt-8">
					<div className="flex items-center gap-[11px]">
						<span className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border-[1.5px] border-accent font-display text-xs font-bold text-accent">
							MX
						</span>
						<span className="font-mono text-[13px] text-[#888E96]">
							© 2026 Madrimov Xudoshukur
						</span>
					</div>
					<div className="flex gap-[22px]">
						{SOCIALS.map((s) => (
							<Link
								key={s.label}
								href={s.href}
								target={s.href.startsWith("mailto") ? undefined : "_blank"}
								rel="noopener"
								className="font-mono text-[13px] text-muted transition-colors hover:text-fg"
							>
								{s.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}
