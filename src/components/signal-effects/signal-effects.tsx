"use client";

import { useEffect, useState } from "react";

/**
 * SignalEffects — single client component mounting every interactive Signal
 * effect. Ported from the signal.dc.html <script> block (lines 360-552).
 *
 * Renders:
 *   - cinematic intro-reveal overlay (MX monogram + INITIALIZING SYSTEMS +
 *     progress bar) that animates out via sgIntroOut then is hidden;
 *   - a static scanline texture overlay.
 *
 * Wires (in useEffect, all DOM lookups null-guarded because the target
 * elements are rendered by components built in later tasks):
 *   - live Tashkent clock (#tashkent-clock);
 *   - animated hero counters (#stat-users → 336+, #stat-team → 7,
 *     #stat-years → 4+);
 *   - hero cursor spotlight (#hero / #hero-spot);
 *   - scroll-reveal for the main sections (IntersectionObserver), respecting
 *     prefers-reduced-motion;
 *   - architecture network canvas (#hero-canvas), 36 nodes / 150px links.
 *
 * Everything is torn down in the effect cleanup.
 */
export default function SignalEffects() {
	// After the intro animation finishes we drop the overlay from the tree so it
	// can never trap clicks even with pointer-events guarded.
	const [introDone, setIntroDone] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setIntroDone(true), 2000);
		return () => clearTimeout(t);
	}, []);

	useEffect(() => {
		const cleanups: Array<() => void> = [];

		// ---- live Tashkent clock -------------------------------------------------
		const clock = document.getElementById("tashkent-clock");
		const writeClock = () => {
			if (!clock) return;
			try {
				const t = new Date().toLocaleTimeString("en-GB", {
					timeZone: "Asia/Tashkent",
					hour12: false,
				});
				clock.textContent = "TASHKENT " + t;
			} catch {
				/* Intl may be unavailable in some runtimes — ignore */
			}
		};
		if (clock) {
			writeClock();
			const id = window.setInterval(writeClock, 1000);
			cleanups.push(() => window.clearInterval(id));
		}

		// ---- animated counters ---------------------------------------------------
		const counters: Array<{
			el: HTMLElement;
			target: number;
			suffix: string;
		}> = [];
		const addCounter = (domId: string, target: number, suffix: string) => {
			const el = document.getElementById(domId);
			if (el) counters.push({ el, target, suffix });
		};
		addCounter("stat-users", 336, "+");
		addCounter("stat-team", 7, "");
		addCounter("stat-years", 4, "+");
		if (counters.length) {
			const dur = 1300;
			const start = performance.now();
			let raf = 0;
			const tick = (now: number) => {
				const p = Math.min(1, (now - start) / dur);
				const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
				for (const c of counters) {
					c.el.textContent = Math.round(c.target * e) + c.suffix;
				}
				if (p < 1) raf = requestAnimationFrame(tick);
			};
			raf = requestAnimationFrame(tick);
			cleanups.push(() => cancelAnimationFrame(raf));
		}

		// ---- hero cursor spotlight ----------------------------------------------
		const hero = document.getElementById("hero");
		const spot = document.getElementById("hero-spot");
		if (hero && spot) {
			const onMove = (ev: MouseEvent) => {
				const r = hero.getBoundingClientRect();
				const x = ev.clientX - r.left;
				const y = ev.clientY - r.top;
				spot.style.background =
					"radial-gradient(560px circle at " +
					x +
					"px " +
					y +
					"px, rgba(255,194,75,.14), transparent 66%)";
			};
			const onLeave = () => {
				spot.style.background = "transparent";
			};
			hero.addEventListener("mousemove", onMove);
			hero.addEventListener("mouseleave", onLeave);
			cleanups.push(() => {
				hero.removeEventListener("mousemove", onMove);
				hero.removeEventListener("mouseleave", onLeave);
			});
		}

		// ---- scroll reveal -------------------------------------------------------
		const sectionIds = [
			"about",
			"skills",
			"experience",
			"projects",
			"blog",
			"contact",
		];
		const sections = sectionIds
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;
		if (sections.length) {
			if (reduceMotion || !("IntersectionObserver" in window)) {
				for (const el of sections) {
					el.style.opacity = "1";
					el.style.transform = "none";
				}
			} else {
				for (const el of sections) {
					el.style.opacity = "0";
					el.style.transform = "translateY(34px)";
					el.style.transition =
						"opacity .8s cubic-bezier(.2,.7,.2,1), transform .8s cubic-bezier(.2,.7,.2,1)";
				}
				const io = new IntersectionObserver(
					(entries) => {
						for (const en of entries) {
							if (en.isIntersecting) {
								const el = en.target as HTMLElement;
								el.style.opacity = "1";
								el.style.transform = "none";
								io.unobserve(el);
							}
						}
					},
					{ threshold: 0.12 }
				);
				for (const el of sections) io.observe(el);
				cleanups.push(() => io.disconnect());
			}
		}

		// ---- architecture network canvas ----------------------------------------
		const canvas = document.getElementById(
			"hero-canvas"
		) as HTMLCanvasElement | null;
		const host = document.getElementById("hero");
		const ctx = canvas?.getContext("2d") ?? null;
		if (canvas && host && ctx) {
			const COUNT = 36;
			const LINK = 150;
			type Node = {
				x: number;
				y: number;
				vx: number;
				vy: number;
				r: number;
				amber: boolean;
				ph: number;
			};
			let nodes: Node[] = [];
			let wh = { w: 0, h: 0 };
			let raf = 0;

			const init = () => {
				const w = host.clientWidth;
				const h = host.clientHeight;
				const dpr = Math.min(window.devicePixelRatio || 1, 2);
				canvas.width = w * dpr;
				canvas.height = h * dpr;
				ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
				wh = { w, h };
				nodes = Array.from({ length: COUNT }, () => ({
					x: Math.random() * w,
					y: Math.random() * h,
					vx: (Math.random() - 0.5) * 0.22,
					vy: (Math.random() - 0.5) * 0.22,
					r: 1.2 + Math.random() * 1.5,
					amber: Math.random() < 0.18,
					ph: Math.random() * Math.PI * 2,
				}));
			};

			const draw = (t: number) => {
				const w = wh.w;
				const h = wh.h;
				ctx.clearRect(0, 0, w, h);
				for (const n of nodes) {
					n.x += n.vx;
					n.y += n.vy;
					if (n.x < 0 || n.x > w) n.vx *= -1;
					if (n.y < 0 || n.y > h) n.vy *= -1;
				}
				for (let i = 0; i < nodes.length; i++) {
					for (let j = i + 1; j < nodes.length; j++) {
						const a = nodes[i];
						const b = nodes[j];
						const dx = a.x - b.x;
						const dy = a.y - b.y;
						const d = Math.hypot(dx, dy);
						if (d < LINK) {
							const al = (1 - d / LINK) * 0.22;
							ctx.strokeStyle = "rgba(255,194,75," + al.toFixed(3) + ")";
							ctx.lineWidth = 1;
							ctx.beginPath();
							ctx.moveTo(a.x, a.y);
							ctx.lineTo(b.x, b.y);
							ctx.stroke();
						}
					}
				}
				for (const n of nodes) {
					const pulse = 0.6 + 0.4 * Math.sin(t / 900 + n.ph);
					ctx.beginPath();
					ctx.arc(n.x, n.y, n.r * (n.amber ? 1.4 : 1), 0, Math.PI * 2);
					ctx.fillStyle = n.amber
						? "rgba(255,194,75," + (0.5 * pulse + 0.3).toFixed(3) + ")"
						: "rgba(155,165,175," + (0.22 * pulse + 0.12).toFixed(3) + ")";
					ctx.fill();
				}
				raf = requestAnimationFrame(draw);
			};

			init();
			raf = requestAnimationFrame(draw);
			const onResize = () => init();
			window.addEventListener("resize", onResize);
			cleanups.push(() => {
				cancelAnimationFrame(raf);
				window.removeEventListener("resize", onResize);
			});
		}

		return () => {
			for (const fn of cleanups) fn();
		};
	}, []);

	return (
		<>
			{/* cinematic intro reveal */}
			{!introDone && (
				<div
					aria-hidden
					className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-[22px] bg-surface animate-sgIntroOut"
				>
					<div className="flex h-14 w-14 items-center justify-center rounded-[15px] border-2 border-accent font-display text-[22px] font-bold text-accent">
						MX
					</div>
					<div className="font-mono text-xs tracking-[.2em] text-[#888E96]">
						INITIALIZING SYSTEMS
					</div>
					<div className="h-0.5 w-[190px] overflow-hidden rounded-sm bg-line">
						<div className="h-full bg-accent animate-sgIntroBar" />
					</div>
				</div>
			)}

			{/* scanline texture overlay */}
			<div
				aria-hidden
				className="pointer-events-none fixed inset-0 z-[200]"
				style={{
					backgroundImage:
						"repeating-linear-gradient(0deg,rgba(255,255,255,.016),rgba(255,255,255,.016) 1px,transparent 1px,transparent 3px)",
				}}
			/>
		</>
	);
}
