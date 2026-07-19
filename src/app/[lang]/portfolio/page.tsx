import Portfolio from "~/components/portfolio/portfolio";
import { PropsWithParams } from "~/types";

export default async function Page(props: PropsWithParams) {
    const params = await props.params;
    return <Portfolio lang={params.lang} standalone />;
}
