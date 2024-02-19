import { MenuItem } from "~/components/navbar/menu-items";

type Work = {
	title: string;
	quote: string;
	desc: string;
	links: {
		[key: string]: string;
	};
};
type Experience = {
	year: string;
	jobTitle: string;
	organization: string;
	link: string;
	desc: string;
};
type Dict = {
	Index: {
		menu: MenuItem[];
		header: {
			subtitle: string;
			name: string;
			jobTitle: string;
		};
		work: Work;
		experience: {
			title: string;
			organizations: Experience[];
		};
	};
};

const dicts = {
	uz: import("./uz.json").then((module) => module.default.Index),
	en: import("./en.json").then((module) => module.default.Index),
};

export const getDict = async (lang: "uz" | "en") => {
	return (await dicts[lang]) as Dict['Index'];
};

