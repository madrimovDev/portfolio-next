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
  const [theme, setTheme] = useState<Theme>("coffee");
  
  const changeTheme = (theme: Theme) => setTheme(theme) 

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return {
    theme,
    changeTheme,
    themes
  } as const
};
