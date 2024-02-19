import Image from "next/image";

export default function PortfolioCard() {
	return (
		<>
			<div className="card card-compact w-full bg-base-200 shadow-xl">
				<figure className="h-[200px]">
					<Image
						src="/mbos-lead.png"
            alt="Shoes"
            className="w-full h-full object-cover"
						width={300}
						height={200}
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title">
						Mbos Lead System
					</h2>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga, rerum.</p>
					<div className="card-actions justify-end">
						<div className="badge badge-outline">Landing</div>
						<div className="badge badge-outline">ReactJS</div>
					</div>
				</div>
			</div>
		</>
	);
}

