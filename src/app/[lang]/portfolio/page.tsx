import Portfolio from "~/components/portfolio/portfolio";
import { Lang } from "~/types";

export default async function Page({
	params,
}: {
	params: Promise<{ lang: Lang }>;
}) {
	const { lang } = await params;
	return <Portfolio lang={lang} standalone />;
}
