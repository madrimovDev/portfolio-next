export type PropsWithLang = {
  lang: Lang
}

export type Lang = 'en' | 'uz' | 'ru'

export type BlogPostMeta = {
	id: string;
	slug: string;
	title: string;
	description: string;
	date: string;
	lastEdited: string;
	tags: string[];
	lang: string;
};
