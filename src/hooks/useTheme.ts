import { useEffect, useState } from "react";
export type Theme =
	| "coffee"
	| "business"
	| "dark"
	| "light"
	| "luxury"
	| "forest"
	| "sunset"
	| "dim"
	| "night";
const themes: Theme[] = [
	"coffee",
	"business",
	"dark",
	"light",
	"luxury",
	"forest",
	"sunset",
	"dim",
	"night",
];
export const useTheme = () => {
	const [theme, setTheme] = useState<Theme>();
	const changeTheme = (theme: Theme) => setTheme(theme);

	useEffect(() => {
		const def = localStorage.getItem("theme");
		if (def) {
			setTheme(def as Theme);
		}
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.localStorage.setItem("theme", theme ?? '');
			document.documentElement.setAttribute("data-theme", theme ?? '');
		}
	}, [theme]);

	return {
		theme,
		changeTheme,
		themes,
	} as const;
};

