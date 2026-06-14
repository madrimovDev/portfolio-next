import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "~/components/reveal/reveal";
import { getDict } from "~/dict";
import { getProjects, getProjectBySlug, getProjectBlocks } from "~/lib/notion";
import { renderBlocks } from "~/lib/notion-render";
import { Lang } from "~/types";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
	const items = (await getProjects("uz")).filter((p) => p.hasCaseStudy);
	const langs: Lang[] = ["uz", "ru", "en"];
	const out: { lang: string; slug: string }[] = [];
	for (const lang of langs) for (const p of items) out.push({ lang, slug: p.slug });
	return out;
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }) {
	const project = await getProjectBySlug(params.lang as Lang, params.slug);
	if (!project || !project.hasCaseStudy) return {};
	return { title: `${project.title} — Case Study | Madrimov Xudoshukur`, description: project.description };
}

export default async function Page({ params }: { params: { lang: string; slug: string } }) {
	const lang = params.lang as Lang;
	const project = await getProjectBySlug(lang, params.slug);
	if (!project || !project.hasCaseStudy) notFound();
	const { ui } = await getDict(lang);
	const blocks = await getProjectBlocks(project.id);
	return (
		<article className="relative mx-auto max-w-3xl px-5 pt-36 pb-24">
			<Reveal>
				<Link href={`/${lang}/case-studies`} className="section-eyebrow">← {ui.caseStudiesTitle}</Link>
			</Reveal>
			<Reveal delay={80}>
				<span className="mt-6 block text-xs font-bold uppercase tracking-widest text-accent">{project.category}</span>
				<h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-ink">{project.title}</h1>
				<p className="mt-3 text-muted">{project.description}</p>
				<div className="mt-4 flex flex-wrap gap-2">
					{project.tags.map((t) => (<span key={t} className="tech-badge">{t}</span>))}
				</div>
			</Reveal>
			<Reveal delay={160}>
				<div className="prose prose-invert mt-8 max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-strong:text-fg prose-code:text-accent prose-code:before:content-none prose-code:after:content-none prose-pre:bg-surface2 prose-pre:border prose-pre:border-line">
					{renderBlocks(blocks)}
				</div>
			</Reveal>
		</article>
	);
}
