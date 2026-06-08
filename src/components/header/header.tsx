import Image from "next/image";
import Link from "next/link";
import { getDict } from "~/dict";
import { PropsWithLang } from "~/types";
import Reveal from "~/components/reveal/reveal";

export default async function Header({ lang }: PropsWithLang) {
	const { header, work } = await getDict(lang);
	return (
		<section
			id="top"
			className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28"
		>
			{/* Background */}
			<div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
			<div className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-accent-indigo/30 blur-[120px]" />
			<div className="pointer-events-none absolute -top-24 right-0 h-[26rem] w-[26rem] rounded-full bg-accent-fuchsia/20 blur-[120px]" />
			<div className="pointer-events-none absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-accent-cyan/15 blur-[120px]" />

			<div className="relative mx-auto max-w-5xl px-5">
				<div className="flex flex-col-reverse items-center gap-10 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex-1 text-center sm:text-left">
						<Reveal>
							<span className="section-eyebrow">
								<span className="inline-block h-2 w-2 rounded-full bg-accent-cyan animate-pulse" />
								{header.greeting}
							</span>
						</Reveal>
						<Reveal delay={80}>
							<h1 className="mt-4 font-display text-[2rem] sm:text-6xl font-bold tracking-tight leading-[1.08] break-words">
								{header.name}
							</h1>
						</Reveal>
						<Reveal delay={160}>
							<p className="mt-3 font-display text-lg sm:text-3xl font-semibold gradient-text break-words">
								{header.jobTitle}
							</p>
						</Reveal>
						<Reveal delay={240}>
							<p className="mt-5 max-w-xl text-muted text-base leading-relaxed mx-auto sm:mx-0">
								{header.subtitle}
							</p>
						</Reveal>
						<Reveal delay={320}>
							<div className="mt-4 inline-flex items-center gap-2 text-sm text-soft">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
								{header.location}
							</div>
						</Reveal>
						<Reveal delay={400}>
							<div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
								<Link href={work.links.Email} className="btn-grad">
									{header.ctaContact}
								</Link>
								<a
									href="/resume.pdf"
									target="_blank"
									rel="noopener"
									className="btn-ghost-line"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
										/>
									</svg>
									{header.ctaCv}
								</a>
								<Link
									href={`/${lang}/portfolio`}
									className="btn-ghost-line"
								>
									{header.ctaProjects}
								</Link>
							</div>
						</Reveal>
					</div>

					{/* Avatar */}
					<Reveal delay={160} className="shrink-0">
						<div className="relative">
							<div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-accent-cyan via-accent to-accent-fuchsia opacity-70 blur-xl animate-float" />
							<div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-accent-cyan via-accent to-accent-fuchsia animate-spin-slow" />
							<Image
								src="/avatar.jpg"
								alt="Madrimov Xudoshukur"
								priority
								width={220}
								height={220}
								className="relative rounded-full w-40 h-40 sm:w-52 sm:h-52 object-cover border-4 border-ink"
							/>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
