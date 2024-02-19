import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {},
	},
  plugins: [require("daisyui"), require('@tailwindcss/typography')],
  daisyui: {
		themes: ['coffee', 'business', 'dark', 'light', 'luxury', 'forest', 'sunset', 'dim', 'night'] 
  }
};
export default config;

