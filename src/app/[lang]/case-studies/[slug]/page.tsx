import { notFound } from "next/navigation";
import CaseStudyView from "~/components/case-study/case-study-view";
import { getCaseStudyBySlug, getAllCaseStudySlugs } from "~/lib/case-studies";
import { Lang } from "~/types";

export const dynamicParams = false;

export async function generateStaticParams() {
  const langs: Lang[] = ["uz", "ru", "en"];
  const out: { lang: string; slug: string }[] = [];
  for (const lang of langs) {
    for (const slug of await getAllCaseStudySlugs(lang)) out.push({ lang, slug });
  }
  return out;
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }) {
  const project = await getCaseStudyBySlug(params.lang as Lang, params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study | Madrimov Xudoshukur`,
    description: project.caseStudy!.problem,
  };
}

export default async function Page({ params }: { params: { lang: string; slug: string } }) {
  const lang = params.lang as Lang;
  const project = await getCaseStudyBySlug(lang, params.slug);
  if (!project) notFound();
  return <CaseStudyView lang={lang} project={project} />;
}
