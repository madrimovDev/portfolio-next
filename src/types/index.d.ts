export type PropsWithParams = {
  params: {
    lang: Lang
  }
}

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
	tags: string[];
	lang: string;
};
