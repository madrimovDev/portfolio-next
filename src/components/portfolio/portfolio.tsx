import PortfolioCard from "./portfolio-card";

export default function Portfolio() {
	return (
		<section className="mt-10">
			<div className="prose">
				<h2>Portfolio</h2>
			</div>
			<div className="grid sm:grid-cols-2 auto-rows-[minmax(400px,_400px)] gap-8 mt-10">
				<PortfolioCard />
				<PortfolioCard />
			</div>
		</section>
	);
}

