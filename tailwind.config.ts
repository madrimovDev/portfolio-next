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
				// Bold Editorial — warm paper + ink + a single red accent.
				paper: "#f7f5f0",
				ink: "#0a0a0a",
				surface: "#ffffff",
				card: "#ffffff",
				line: "#e4e0d8",
				muted: "#57534e",
				soft: "#8a857d",
				accent: {
					// One red family. cyan/fuchsia/indigo kept as keys so existing
					// components (text-accent-cyan etc.) re-skin automatically.
					DEFAULT: "#e11d48",
					cyan: "#e11d48",
					fuchsia: "#be123c",
					indigo: "#e11d48",
				},
			},
			keyframes: {
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
