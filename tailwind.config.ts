import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)", "system-ui", "sans-serif"],
				display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
				mono: ["var(--font-mono)", "ui-monospace", "monospace"],
			},
			colors: {
				// === Signal dark palette ===
				// NOTE: do NOT name a color "base" — it collides with Tailwind's
				// `text-base` font-size utility and turns 16px text black.
				night: "#070611",
				surface: "#0B0C0E",
				surface2: "#0E1013",
				surface3: "#141619",
				fg: "#E8E9EA",
				faint: "#5b6068",
				line2: "#23262b",
				line3: "#2c2f34",

				// === Legacy editorial tokens — remapped to Signal dark so existing
				// components (text-ink, bg-paper, border-line, ...) auto-reskin to dark.
				// Refined per-component in later tasks. ===
				paper: "#070611",
				ink: "#E8E9EA",
				card: "#0E1013",
				line: "#1c1f23",
				muted: "#9aa0a8",
				soft: "#6b7178",
				accent: {
					// One amber family. cyan/fuchsia/indigo kept as keys so existing
					// components (text-accent-cyan etc.) re-skin automatically.
					DEFAULT: "#FFC24B",
					cyan: "#FFC24B",
					fuchsia: "#FFB42B",
					indigo: "#FFD27A",
				},
			},
			keyframes: {
				// === Signal keyframes (from signal.dc.html <style>) ===
				sgUp: {
					from: { opacity: "0", transform: "translateY(20px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				sgPulse: {
					"0%,100%": {
						opacity: "1",
						boxShadow: "0 0 0 0 rgba(255,194,75,.5)",
					},
					"50%": {
						opacity: ".7",
						boxShadow: "0 0 0 6px rgba(255,194,75,0)",
					},
				},
				sgDrift: {
					from: { backgroundPosition: "0 0,0 0" },
					to: { backgroundPosition: "62px 62px,62px 62px" },
				},
				sgMarquee: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(-50%)" },
				},
				sgIntroOut: {
					"0%,66%": { opacity: "1", transform: "translateY(0)" },
					"100%": {
						opacity: "0",
						transform: "translateY(-100%)",
						visibility: "hidden",
					},
				},
				sgIntroBar: {
					from: { width: "0" },
					to: { width: "100%" },
				},
				sgSheen: {
					"0%": { transform: "translateX(-120%) skewX(-18deg)" },
					"100%": { transform: "translateX(320%) skewX(-18deg)" },
				},
				sgAuroraA: {
					"0%": { transform: "translate(0,0) scale(1)" },
					"50%": { transform: "translate(6vw,4vh) scale(1.18)" },
					"100%": { transform: "translate(0,0) scale(1)" },
				},
				sgAuroraB: {
					"0%": { transform: "translate(0,0) scale(1.1)" },
					"50%": { transform: "translate(-7vw,-5vh) scale(1)" },
					"100%": { transform: "translate(0,0) scale(1.1)" },
				},
				sgAuroraC: {
					"0%": { transform: "translate(0,0) scale(1)" },
					"50%": { transform: "translate(5vw,-6vh) scale(1.22)" },
					"100%": { transform: "translate(0,0) scale(1)" },
				},

				// === Legacy keyframes kept so existing animate-* usages keep working ===
				"fade-up": {
					"0%": { opacity: "0", transform: "translateY(24px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				float: {
					"0%,100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-14px)" },
				},
				"gradient-shift": {
					"0%,100%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
				},
				"spin-slow": {
					to: { transform: "rotate(360deg)" },
				},
			},
			animation: {
				// === Signal animations ===
				sgUp: "sgUp .6s ease both",
				sgPulse: "sgPulse 2.4s ease-in-out infinite",
				sgDrift: "sgDrift 9s linear infinite",
				sgMarquee: "sgMarquee 30s linear infinite",
				sgIntroOut: "sgIntroOut 1.9s cubic-bezier(.7,0,.2,1) forwards",
				sgIntroBar: "sgIntroBar 1.2s ease forwards",
				sgSheen: "sgSheen 1.1s ease forwards",
				sgAuroraA: "sgAuroraA 40s ease-in-out infinite",
				sgAuroraB: "sgAuroraB 46s ease-in-out infinite",
				sgAuroraC: "sgAuroraC 52s ease-in-out infinite",

				// === Legacy animations kept ===
				"fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
				float: "float 7s ease-in-out infinite",
				"gradient-shift": "gradient-shift 6s ease infinite",
				"spin-slow": "spin-slow 18s linear infinite",
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
export default config;
