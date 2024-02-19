import Image from "next/image";
import { getDict } from "~/dict";
import { Lang, PropsWithLang } from "~/types";

export default async function Header({ lang }: PropsWithLang) {
	const { header } = await getDict(lang);
	return (
		<section className="mt-10 sm:mt-20">
			<div className="bg-neutral text-sm text-neutral-content  p-4 rounded-box sm:text-lg text-center">
				{header.subtitle}
			</div>
			<div className="flex items-center flex-col sm:flex-row mt-10 sm:mt-14 gap-4">
				<div className="flex-1">
					<h1 className="text-3xl sm:text-4xl text-center sm:text-left font-bold">
						{header.name}
					</h1>
					<p className="text-neutral-content text-center sm:text-left">
						{header.jobTitle}
					</p>
				</div>
				<Image
					src="/avatar.jpg"
					alt="Xudoshukur Madrimov"
					priority
					className="rounded-full border-8 border-primary w-full max-w-[300px] sm:max-w-none sm:w-[120px]"
					width={100}
					height={100}
				/>
			</div>
		</section>
	);
}

