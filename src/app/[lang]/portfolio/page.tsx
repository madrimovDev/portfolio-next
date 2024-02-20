import Portfolio from "~/components/portfolio/portfolio";
import { PropsWithParams } from "~/types";

export default function Page({ params }: PropsWithParams) {
	return (
		<>
			<Portfolio lang={params.lang} />
		</>
	);
}

