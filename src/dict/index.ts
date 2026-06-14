import { MenuItem } from "~/components/navbar/menu-items";

type IndexHeader = {
	greeting: string;
	subtitle: string;
	name: string;
	jobTitle: string;
	location: string;
	ctaContact: string;
	ctaCv: string;
	ctaProjects: string;
	stats?: { value: string; label: string }[];
};

type Work = {
	title: string;
	eyebrow: string;
	quote: string;
	desc: string;
	links: {
		[key: string]: string;
	};
};

type SkillGroup = {
	category: string;
	items: string[];
};

type Skills = {
	title: string;
	eyebrow: string;
	groups: SkillGroup[];
};

type ExperienceItem = {
	year: string;
	jobTitle: string;
	organization: string;
	link: string;
	desc: string;
	stack?: string[];
	projects?: string[];
};

type Experience = {
	title: string;
	eyebrow: string;
	organizations: ExperienceItem[];
};

type CaseStudy = {
	category: string;
	problem: string;
	role: string;
	solution: string;
	results: { value: string; label: string }[];
	lessons: string;
};

type Project = {
	title: string;
	description: string;
	tags: string[];
	gradient: string;
	link?: string;
	private?: boolean;
	img?: string;
	slug: string;
	caseStudy?: CaseStudy;
};

type Portfolio = {
	title: string;
	eyebrow: string;
	subtitle: string;
	viewAll: string;
	projects: Project[];
};

type Ui = {
	private: string;
	visit: string;
	caseStudy: string;
	csProblem: string;
	csRole: string;
	csSolution: string;
	csResults: string;
	csLessons: string;
	caseStudiesTitle: string;
	blogTitle: string;
};

type Index = {
	menu: MenuItem[];
	header: IndexHeader;
	work: Work;
	skills: Skills;
	experience: Experience;
	portfolio: Portfolio;
	ui: Ui;
};

export type Dict = {
	Index: Index;
};

const dicts = {
	uz: import("./uz.json").then((module) => module.default.Index),
	en: import("./en.json").then((module) => module.default.Index),
	ru: import("./ru.json").then((module) => module.default.Index),
};

export const getDict = async (lang: "uz" | "en" | "ru") => {
	return (await dicts[lang]) as Dict["Index"];
};
