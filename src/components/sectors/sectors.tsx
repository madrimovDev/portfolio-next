/**
 * Sectors strip (signal.dc.html 139-147).
 *
 * Static server component. A slim surface2 band with top/bottom borders: a mono
 * label on the left, the served sectors (Unbounded) on the right.
 */
const SECTORS = ["Davlat", "Ta'lim", "Fintech", "Transport"];

export default function Sectors() {
	return (
		<div className="border-y border-line bg-surface2">
			<div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-[18px] px-5 py-6 sm:px-8">
				<span className="font-mono text-[11px] tracking-[.14em] text-[#5b6068]">
					ISHONCH BILAN XIZMAT QILGAN SOHALAR
				</span>
				<div className="flex flex-wrap gap-9 font-display text-[clamp(15px,1.6vw,19px)] font-medium tracking-[.01em] text-[#6b7178]">
					{SECTORS.map((s) => (
						<span key={s}>{s}</span>
					))}
				</div>
			</div>
		</div>
	);
}
