import Experience from "~/components/experience/experience";
import Header from "~/components/header/header";
import MyWork from "~/components/my-work/my-work";
import { PropsWithParams } from "~/types";

export default function Home({ params }: PropsWithParams) {
	return (
		<main className="">
			<Header lang={params.lang} />
			<hr className="border-base-content/50 my-10" />
			<MyWork lang={params.lang} />
			<hr className="border-base-content/50 my-10" />
			<Experience lang={params.lang} />
		</main>
	);
}

