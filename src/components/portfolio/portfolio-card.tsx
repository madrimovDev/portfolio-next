import Image from "next/image";
import Link from "next/link";
import { Dict } from "~/dict";

export default function PortfolioCard({
	project,
}: {
	project: Dict["Index"]["portfolio"]["projects"][number];
}) {
	return (
		<>
			<div className="card card-compact w-full bg-base-200 shadow-xl">
				<figure className="h-[200px]">
					<Image
						src={project.img}
						alt={project.title}
						className="w-full h-full object-cover"
						width={300}
						height={200}
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title">{project.title}</h2>
					<p>{project.description}</p>
					{project.link && <Link className="link" href={project.link}>Visit</Link>}
					<div className="card-actions justify-end">
						{project.tags.map((tag) => {
							return (
								<div
									className="badge badge-outline badge-sm"
									key={tag}
								>
									{tag}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
}

