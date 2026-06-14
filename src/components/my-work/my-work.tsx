import Link from "next/link";
import { getDict } from "~/dict";
import { PropsWithLang } from "~/types";
import Reveal from "~/components/reveal/reveal";

const ICONS: Record<string, JSX.Element> = {
	GitHub: (
		<path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.3 9.3 0 0112 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0022 12.25C22 6.58 17.52 2 12 2z" />
	),
	Telegram: (
		<path d="M21.95 4.06l-3.3 15.56c-.24 1.1-.9 1.37-1.83.86l-5.05-3.72-2.44 2.35c-.27.27-.5.5-1.02.5l.36-5.16 9.4-8.49c.41-.36-.09-.56-.63-.2L5.18 13.07.18 11.5c-1.09-.34-1.1-1.09.23-1.62l19.55-7.53c.9-.34 1.69.2 1.39 1.71z" />
	),
	Email: (
		<path d="M3 5h18a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1zm9 7L4.4 7h15.2L12 12zm0 2.3L3.8 8.6V18h16.4V8.6L12 14.3z" />
	),
};

export default async function MyWork({ lang }: PropsWithLang) {
	const { work } = await getDict(lang);
	return (
		<section id="about" className="relative py-20 sm:py-28">
			<div className="mx-auto max-w-5xl px-5">
				<div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16 items-start">
					<Reveal>
						<div>
							<span className="section-eyebrow">{work.eyebrow}</span>
							<h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold tracking-tight">
								{work.title}
							</h2>
							<p className="mt-5 text-xl font-display font-medium gradient-text">
								“{work.quote}”
							</p>
						</div>
					</Reveal>

					<Reveal delay={120}>
						<div>
							<p className="text-muted text-base sm:text-lg leading-relaxed">
								{work.desc}
							</p>
							<div className="mt-7 flex flex-wrap gap-3">
								{Object.keys(work.links).map((key) => (
									<Link
										key={key}
										href={work.links[key]}
										target={work.links[key].startsWith("mailto") ? undefined : "_blank"}
										rel="noopener"
										className="group inline-flex items-center gap-2 rounded-xl border border-line bg-black/[0.02] px-4 py-2.5 text-sm font-medium text-muted hover:text-ink hover:border-accent/50 hover:bg-accent/10 transition-colors"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											className="h-4 w-4 fill-current text-accent group-hover:text-accent-cyan transition-colors"
										>
											{ICONS[key]}
										</svg>
										{key}
									</Link>
								))}
							</div>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
