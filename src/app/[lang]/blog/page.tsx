import { Metadata } from "next";
import Link from "next/link";
import Reveal from "~/components/reveal/reveal";
import { getDict } from "~/dict";
import { getPublishedPosts } from "~/lib/notion";
import { PropsWithParams, Lang } from "~/types";
import { formatDate } from "~/lib/format-date";
import { SITE_NAME, OG_LOCALE, alternates, pageUrl } from "~/lib/seo";

export const revalidate = 300;

const BLOG_DESC: Record<Lang, string> = {
	uz: "Backend, arxitektura, DevOps va production muhandisligi haqida Xudoshukur Madrimov bloglari.",
	ru: "Блог Худошукура Мадримова о бэкенде, архитектуре, DevOps и продакшн-инженерии.",
	en: "Articles by Xudoshukur Madrimov on backend, architecture, DevOps and production engineering.",
};

export async function generateMetadata(props: PropsWithParams): Promise<Metadata> {
    const params = await props.params;
    const { ui } = await getDict(params.lang);
    const suffix = "/blog";
    return {
		title: ui.blogTitle,
		description: BLOG_DESC[params.lang],
		alternates: alternates(params.lang, suffix),
		openGraph: {
			type: "website",
			locale: OG_LOCALE[params.lang],
			url: pageUrl(params.lang, suffix),
			title: ui.blogTitle,
			description: BLOG_DESC[params.lang],
			siteName: `${SITE_NAME} Portfolio`,
		},
	};
}

export default async function BlogPage(props: PropsWithParams) {
    const params = await props.params;
    const lang = params.lang as Lang;
    const { ui } = await getDict(lang);
    const posts = await getPublishedPosts(lang);
    return (
		<section className="relative mx-auto max-w-3xl px-5 pt-36 pb-24">
			<Reveal>
				<span className="section-eyebrow">{ui.blogTitle}</span>
			</Reveal>
			<div className="mt-8 flex flex-col divide-y divide-line">
				{posts.map((p, i) => (
					<Reveal key={p.slug} delay={i * 80}>
						<Link href={`/${lang}/blog/${p.slug}`} className="group block py-7">
							<span className="font-mono text-xs text-soft">
								{formatDate(p.date, lang)}
							</span>
							<h2 className="mt-2 font-display text-2xl font-bold text-ink transition-colors group-hover:text-accent">
								{p.title}
							</h2>
							<p className="mt-2 text-muted">{p.description}</p>
							<div className="mt-3 flex flex-wrap gap-1.5">
								{p.tags.map((t) => (
									<span key={t} className="tech-badge">{t}</span>
								))}
							</div>
						</Link>
					</Reveal>
				))}
			</div>
		</section>
	);
}
