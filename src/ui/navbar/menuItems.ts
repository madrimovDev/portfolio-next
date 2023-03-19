import { IconType } from "react-icons";
import { BsHouse, BsBriefcase, BsNewspaper } from "react-icons/bs";

export interface MenuItem {
	href: string;
	title: string;
	Icon: IconType;
	target?: "_blank";
}

export const menuItems: MenuItem[] = [
	{
		href: "/",
		title: "Home",
		Icon: BsHouse,
	},
	{
		href: "/works",
		title: "Works",
		Icon: BsBriefcase,
	},
	{
		href: "/blogs",
		title: "Blogs",
		Icon: BsNewspaper,
	},
];
