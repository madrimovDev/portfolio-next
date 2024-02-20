import { PropsWithLang } from "~/types";
import PortfolioCard from "./portfolio-card";
import { getDict } from "~/dict";

export default async function Portfolio({ lang }: PropsWithLang) {
	const { portfolio } = await getDict(lang);
	return (
		<section className="mt-10">
			<div className="prose">
				<h2>{portfolio.title}</h2>
			</div>
			<div className="grid sm:grid-cols-2 auto-rows-[minmax(400px,_400px)] gap-8 mt-10">
				{portfolio.projects.map((project) => {
					return <PortfolioCard key={project.title} project={project} />;
				})}
			</div>
		</section>
	);
}

