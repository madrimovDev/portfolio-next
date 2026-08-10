import { SITE_URL } from "~/lib/seo";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;

/**
 * Yangi fikr haqida shaxsiy DM. Moderatsiya vositasi emas — oddiy xabar.
 * Har qanday nosozlik jimgina yutiladi: komentariya baribir saqlangan.
 */
export async function notifyNewComment(opts: {
	slug: string;
	lang: string;
	name: string;
	body: string;
}): Promise<void> {
	if (!TOKEN || !CHAT_ID) return;
	const preview = opts.body.length > 300 ? `${opts.body.slice(0, 300)}…` : opts.body;
	const text = [
		`💬 Yangi fikr — ${opts.slug} (${opts.lang})`,
		"",
		`${opts.name}:`,
		preview,
		"",
		`${SITE_URL}/${opts.lang}/blog/${opts.slug}`,
	].join("\n");

	try {
		await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: CHAT_ID,
				text,
				disable_web_page_preview: true,
			}),
			signal: AbortSignal.timeout(5000),
		});
	} catch {
		/* jimgina */
	}
}
