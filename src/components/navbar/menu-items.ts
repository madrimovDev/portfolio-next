export interface MenuItem {
	title: string;
	href: string;
}

export const menuItems: MenuItem[] = [
	{
		href: "/",
		title: "Home",
  },
  {
		href: "#about",
		title: "About",
  },
  {
		href: "/contact",
		title: "Contact",
	},
];
