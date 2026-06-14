import { getDict } from "~/dict";
import { Lang } from "~/types";

export async function getCaseStudies(lang: Lang) {
  const dict = await getDict(lang);
  return dict.portfolio.projects.filter((p) => p.caseStudy);
}

export async function getCaseStudyBySlug(lang: Lang, slug: string) {
  const dict = await getDict(lang);
  return dict.portfolio.projects.find((p) => p.slug === slug && p.caseStudy) ?? null;
}

export async function getAllCaseStudySlugs(lang: Lang) {
  const items = await getCaseStudies(lang);
  return items.map((p) => p.slug);
}
