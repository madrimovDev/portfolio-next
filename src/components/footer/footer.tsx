import Link from "next/link";

const SOCIALS = [
	{ label: "GitHub", href: "https://github.com/madrimovDev" },
	{ label: "Telegram", href: "https://t.me/madrimov" },
	{ label: "Email", href: "mailto:madrimov5014@gmail.com" },
];

export default function Footer() {
	return (
		<footer className="relative mt-10 border-t border-line">
			<div className="mx-auto max-w-5xl px-5 py-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
				<Link href="/" className="font-display text-lg font-bold">
					<span className="gradient-text">{`</>`}</span>
					<span className="ml-2 text-ink">madrimov.uz</span>
				</Link>

				<div className="flex items-center gap-5 text-sm">
					{SOCIALS.map((s) => (
						<Link
							key={s.label}
							href={s.href}
							target={s.href.startsWith("mailto") ? undefined : "_blank"}
							rel="noopener"
							className="text-muted hover:text-ink transition-colors"
						>
							{s.label}
						</Link>
					))}
				</div>

				<p className="text-xs text-soft">
					Telegram:{" "}
					<Link
						href="https://t.me/madrimov"
						target="_blank"
						rel="noopener"
						className="text-muted hover:text-ink transition-colors"
					>
						@madrimov
					</Link>
				</p>

				<p className="text-xs text-soft">
					© {new Date().getFullYear()} Madrimov Xudoshukur
				</p>
			</div>
		</footer>
	);
}
