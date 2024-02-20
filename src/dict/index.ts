import { MenuItem } from "~/components/navbar/menu-items";


type IndexHeader = {
  subtitle: string;
  name: string;
  jobTitle: string;
};

type Work = {
  title: string;
  quote: string;
  desc: string;
  links: {
    [key: string]: string;
  };
};

type ExperienceItem = {
  year: string;
  jobTitle: string;
  organization: string;
  link: string;
  desc: string;
};

type Experience = {
  title: string;
  organizations: ExperienceItem[];
};

type Project = {
  title: string;
  description: string;
  tags: string[];
  img: string;
  link?: string;
};

type Portfolio = {
  title: string;
  projects: Project[];
};

type Index = {
  menu: MenuItem[];
  header: IndexHeader;
  work: Work;
  experience: Experience;
  portfolio: Portfolio;
};

export type Dict = {
	Index: Index
}

const dicts = {
	uz: import("./uz.json").then((module) => module.default.Index),
	en: import("./en.json").then((module) => module.default.Index),
	ru: import("./ru.json").then((module) => module.default.Index),
};

export const getDict = async (lang: "uz" | "en" | 'ru') => {
	return (await dicts[lang]) as Dict['Index'];
};

