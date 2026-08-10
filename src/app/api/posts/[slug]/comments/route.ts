import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { addComment, clientIp, getComments, hashIp } from "~/lib/supabase";
import { notifyNewComment } from "~/lib/telegram";
import { cleanBody, cleanName, isValidLang, isValidSlug } from "~/lib/validate";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET(
	req: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params;
	const lang = new URL(req.url).searchParams.get("lang") ?? "uz";
	if (!isValidSlug(slug) || !isValidLang(lang)) {
		return NextResponse.json({ error: "bad_request" }, { status: 400, headers: NO_STORE });
	}
	// Faqat o'qish. `getPostThread` EMAS — u post_stats ga qator yozadi va
	// ommaviy endpointda ishlatilsa bazani soxta slug'lar bilan to'ldirish
	// mumkin bo'lardi.
	const comments = await getComments(slug, lang);
	return NextResponse.json({ comments }, { headers: NO_STORE });
}

export async function POST(
	req: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params;
	if (!isValidSlug(slug)) {
		return NextResponse.json({ error: "bad_request" }, { status: 400, headers: NO_STORE });
	}

	let payload: { lang?: unknown; name?: unknown; body?: unknown; website?: unknown };
	try {
		payload = await req.json();
	} catch {
		return NextResponse.json({ error: "bad_request" }, { status: 400, headers: NO_STORE });
	}

	// Honeypot: yashirin maydon to'ldirilgan bo'lsa bot deb hisoblaymiz.
	// 200 qaytaramiz — bot muvaffaqiyat deb o'ylab qaytib urinmaydi.
	if (typeof payload.website === "string" && payload.website.length > 0) {
		return NextResponse.json({ comment: null }, { headers: NO_STORE });
	}

	const lang = typeof payload.lang === "string" ? payload.lang : "";
	const name = cleanName(payload.name);
	const body = cleanBody(payload.body);
	if (!isValidLang(lang) || !name || !body) {
		return NextResponse.json({ error: "invalid_input" }, { status: 400, headers: NO_STORE });
	}

	const ipHash = await hashIp(clientIp(req.headers));
	const { comment, error } = await addComment(slug, lang, name, body, ipHash);

	if (error === "rate_limited") {
		return NextResponse.json({ error }, { status: 429, headers: NO_STORE });
	}
	if (error === "duplicate") {
		return NextResponse.json({ error }, { status: 409, headers: NO_STORE });
	}
	if (error === "unknown_slug") {
		return NextResponse.json({ error }, { status: 404, headers: NO_STORE });
	}
	if (!comment) {
		return NextResponse.json({ error: "unavailable" }, { status: 503, headers: NO_STORE });
	}

	// Fikr hammaga darrov ko'rinsin. Bu Notion'dan maqola matnini ham
	// qayta oladi — qabul qilingan narx, komentariya rate-limiti bilan chegaralangan.
	revalidatePath(`/${lang}/blog/${slug}`);

	// Bildirishnomani kutmaymiz — javob tez qaytsin.
	void notifyNewComment({ slug, lang, name, body });

	return NextResponse.json({ comment }, { headers: NO_STORE });
}
