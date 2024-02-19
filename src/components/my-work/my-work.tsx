import Link from "next/link";
import { getDict } from "~/dict";
import { PropsWithLang } from "~/types";

export default async function MyWork({ lang }: PropsWithLang) {
	const { work } = await getDict(lang);
	return (
		<section
			className="prose prose-lg"
			id="about"
		>
			<h2>{work.title}</h2>
			<p className="">{work.quote}</p>
			<p className="text-neutral-content">{work.desc}</p>
			<div className="flex gap-2">
				{Object.keys(work.links).map((key) => {
					return (
						<Link
							key={key}
							href={work.links[key]}
							target="_blank"
						>
							{key}
						</Link>
					);
				})}
			</div>
		</section>
	);
}

