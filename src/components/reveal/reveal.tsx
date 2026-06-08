import type { ReactNode } from "react";

/**
 * Lightweight entrance-animation wrapper. Pure CSS (no JS / no observer) so it
 * is SSR-safe, crawler-friendly and always ends visible. Elements fade-up on
 * load with an optional stagger delay.
 */
export default function Reveal({
	children,
	delay = 0,
	className = "",
}: {
	children: ReactNode;
	delay?: number;
	className?: string;
}) {
	return (
		<div
			className={`animate-fade-up ${className}`}
			style={delay ? { animationDelay: `${delay}ms` } : undefined}
		>
			{children}
		</div>
	);
}
