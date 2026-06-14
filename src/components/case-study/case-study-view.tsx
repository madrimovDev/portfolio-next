import Link from "next/link";
import Reveal from "~/components/reveal/reveal";
import { getDict } from "~/dict";
import { Lang } from "~/types";
import { getCaseStudyBySlug } from "~/lib/case-studies";

type Props = {
  lang: Lang;
  project: NonNullable<Awaited<ReturnType<typeof getCaseStudyBySlug>>>;
};

export default async function CaseStudyView({ lang, project }: Props) {
  const { ui } = await getDict(lang);
  const cs = project.caseStudy!;
  return (
    <article className="relative mx-auto max-w-3xl px-5 pt-36 pb-24">
      <Reveal>
        <Link href={`/${lang}/case-studies`} className="section-eyebrow">← {ui.caseStudiesTitle}</Link>
      </Reveal>
      <Reveal delay={80}>
        <span className="mt-6 block text-xs font-bold uppercase tracking-widest text-accent-cyan">{cs.category}</span>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight">{project.title}</h1>
        <p className="mt-3 text-muted">{project.description}</p>
      </Reveal>
      <Reveal delay={160}>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (<span key={t} className="tech-badge">{t}</span>))}
        </div>
      </Reveal>
      <CsBlock delay={220} title={ui.csProblem} body={cs.problem} />
      <CsBlock delay={260} title={ui.csRole} body={cs.role} />
      <CsBlock delay={300} title={ui.csSolution} body={cs.solution} />
      <Reveal delay={340}>
        <h2 className="mt-10 section-eyebrow">{ui.csResults}</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-3">
          {cs.results.map((r) => (
            <div key={r.label} className="card-surface rounded-2xl p-5">
              <div className="gradient-text text-3xl font-bold">{r.value}</div>
              <div className="mt-1 text-sm text-muted">{r.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
      <CsBlock delay={400} title={ui.csLessons} body={cs.lessons} />
    </article>
  );
}

function CsBlock({ title, body, delay }: { title: string; body: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <h2 className="mt-10 section-eyebrow">{title}</h2>
      <p className="mt-3 leading-relaxed text-[#d3d5e3]">{body}</p>
    </Reveal>
  );
}
