/**
 * Aurora backdrop — fixed full-screen, behind all content.
 *
 * Serious, muted Signal palette: a deep graphite radial base plus three large
 * blurred slate/graphite circles. Strictly decorative — pointer-events:none,
 * no interactivity. Server component.
 *
 * Performance: the circles are STATIC (no drift animation). Animating
 * `transform` on a blur(90px) layer forces a full-screen re-rasterisation every
 * frame — the dominant GPU cost on this page. Static blurred gradients are
 * rasterised once and composited cheaply. Blur is also reduced to 60px (cheaper
 * to rasterise) with no perceptible visual change at this opacity.
 *
 * Ported from signal.dc.html lines 34-38.
 */
export default function Aurora() {
	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
			style={{
				background:
					"radial-gradient(130% 100% at 50% -15%,#0e1116 0%,#090b0e 55%,#060708 100%)",
			}}
		>
			<div
				className="absolute rounded-full"
				style={{
					top: "-16%",
					left: "-12%",
					width: "66vw",
					height: "66vw",
					background:
						"radial-gradient(circle,rgba(48,60,78,.34),transparent 64%)",
					filter: "blur(60px)",
				}}
			/>
			<div
				className="absolute rounded-full"
				style={{
					top: "10%",
					right: "-18%",
					width: "62vw",
					height: "62vw",
					background:
						"radial-gradient(circle,rgba(40,50,64,.3),transparent 65%)",
					filter: "blur(60px)",
				}}
			/>
			<div
				className="absolute rounded-full"
				style={{
					bottom: "-22%",
					left: "28%",
					width: "60vw",
					height: "60vw",
					background:
						"radial-gradient(circle,rgba(34,42,54,.34),transparent 64%)",
					filter: "blur(60px)",
				}}
			/>
		</div>
	);
}
