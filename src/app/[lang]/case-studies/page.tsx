import { Metadata } from "next";
import Link from "next/link";
import Reveal from "~/components/reveal/reveal";
import { getDict } from "~/dict";
import { getProjects } from "~/lib/notion";
import { PropsWithParams, Lang } from "~/types";
import { SITE_NAME, OG_LOCALE, alternates, pageUrl } from "~/lib/seo";

export const revalidate = 300;

const CS_DESC: Record<Lang, string> = {
	uz: "Xudoshukur Madrimov ishlab chiqqan production tizimlari bo'yicha case study'lar — davlat, ta'lim, fintech va transport.",
	ru: "Кейсы по production-системам, созданным Худошукуром Мадримовым — госсектор, образование, финтех и транспорт.",
	en: "Case studies of production systems built by Xudoshukur Madrimov — government, education, fintech and transport.",
};

export async function generateMetadata({ params }: PropsWithParams): Promise<Metadata> {
	const { ui } = await getDict(params.lang);
	const suffix = "/case-studies";
	return {
		title: ui.caseStudiesTitle,
		description: CS_DESC[params.lang],
		alternates: alternates(params.lang, suffix),
		openGraph: {
			type: "website",
			locale: OG_LOCALE[params.lang],
			url: pageUrl(params.lang, suffix),
			title: ui.caseStudiesTitle,
			description: CS_DESC[params.lang],
			siteName: `${SITE_NAME} Portfolio`,
		},
	};
}

export default async function CaseStudiesPage({ params }: PropsWithParams) {
	const lang = params.lang as Lang;
	const { ui } = await getDict(lang);
	const items = (await getProjects(lang)).filter((p) => p.hasCaseStudy);
	return (
		<section className="relative mx-auto max-w-5xl px-5 pt-36 pb-24">
			<Reveal><span className="section-eyebrow">{ui.caseStudiesTitle}</span></Reveal>
			<div className="mt-8 grid gap-5 sm:grid-cols-2">
				{items.map((p, i) => (
					<Reveal key={p.slug} delay={i * 80}>
						<Link href={`/${lang}/case-studies/${p.slug}`} className="card-surface block rounded-2xl p-6">
							<span className="text-xs font-bold uppercase tracking-widest text-accent">{p.category}</span>
							<h2 className="mt-2 font-display text-2xl font-bold">{p.title}</h2>
							<p className="mt-2 text-sm text-muted">{p.description}</p>
							<span className="mt-4 inline-block text-sm text-accent">{ui.caseStudy} →</span>
						</Link>
					</Reveal>
				))}
			</div>
		</section>
	);
}
