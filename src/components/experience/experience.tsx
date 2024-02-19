import Link from "next/link";
import { getDict } from "~/dict";
import { PropsWithLang } from "~/types";

export default async function Experience({ lang }: PropsWithLang) {
	const { experience } = await getDict(lang);
	return (
		<section className="prose">
			<h2>{experience.title}</h2>
			<div className="grid grid-cols-[80px_1fr] gap-4 sm:gap-8">
				{experience.organizations.map((org) => {
					return (
						<>
							<div
								key={org.organization}
								className="not-prose"
							>
								<p>{org.year}</p>
							</div>
							<div>
								<h3 className="my-0">{org.organization}</h3>
								<Link href={`https://${org.link}`} target="_blank">{org.link}</Link>
								<h4>{org.jobTitle}</h4>
								<p>{org.desc}</p>
							</div>
						</>
					);
				})}
			</div>
		</section>
	);
}

