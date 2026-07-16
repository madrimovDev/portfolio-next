import Link from "next/link";
import { getDict } from "~/dict";
import { TELEGRAM_CHANNEL_URL } from "~/lib/site";
import { PropsWithLang } from "~/types";

/** Maqola oxiridagi kanal CTA — Signal glass blok, amber tugma. */
export default async function TelegramCta({ lang }: PropsWithLang) {
	const { ui } = await getDict(lang);
	return (
		<div className="glass mt-12 rounded-2xl border border-accent/30 p-6 sm:p-8">
			<h2 className="m-0 font-display text-xl font-bold">{ui.tgCtaTitle}</h2>
			<p className="mt-2 text-muted">{ui.tgCtaDesc}</p>
			<Link
				href={TELEGRAM_CHANNEL_URL}
				target="_blank"
				rel="noopener"
				className="btn-amber mt-5 inline-flex"
			>
				{ui.tgCtaBtn} <span className="font-mono">→</span>
			</Link>
		</div>
	);
}
