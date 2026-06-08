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
			},
			colors: {
				ink: "#0a0a0f",
				surface: "#12121a",
				card: "#16161f",
				line: "#262633",
				muted: "#9aa0b4",
				soft: "#6b7088",
				accent: {
					DEFAULT: "#8b5cf6",
					cyan: "#22d3ee",
					fuchsia: "#e879f9",
					indigo: "#6366f1",
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
