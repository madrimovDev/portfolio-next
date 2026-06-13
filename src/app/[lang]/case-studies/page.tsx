import Link from "next/link";
import Reveal from "~/components/reveal/reveal";
import { getDict } from "~/dict";
import { getCaseStudies } from "~/lib/case-studies";
import { PropsWithParams, Lang } from "~/types";

export default async function CaseStudiesPage({ params }: PropsWithParams) {
  const lang = params.lang as Lang;
  const { ui } = await getDict(lang);
  const items = await getCaseStudies(lang);
  return (
    <section className="relative mx-auto max-w-5xl px-5 pt-36 pb-24">
      <Reveal><span className="section-eyebrow">{ui.caseStudiesTitle}</span></Reveal>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {items.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <Link href={`/${lang}/case-studies/${p.slug}`} className="card-surface block rounded-2xl p-6">
              <span className="text-xs font-bold uppercase tracking-widest text-accent-cyan">{p.caseStudy!.category}</span>
              <h2 className="mt-2 font-display text-2xl font-bold">{p.title}</h2>
              <p className="mt-2 text-sm text-muted">{p.description}</p>
              <span className="mt-4 inline-block text-sm text-accent-fuchsia">{ui.caseStudy} →</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
