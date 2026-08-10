import { NextResponse } from "next/server";
import { aliasFor } from "~/lib/alias";
import { clientIp, hashIp } from "~/lib/supabase";
import { isValidLang, isValidSlug } from "~/lib/validate";

const NO_STORE = { "Cache-Control": "no-store" };

/**
 * Ism maydonini bo'sh qoldirsa qanday taxallus olishini oldindan ko'rsatadi.
 *
 * Bazaga UMUMAN tegmaydi — sof hisob-kitob (ip_hash + slug -> satr).
 * Shuning uchun noma'lum slug bilan chaqirilsa ham hech narsa yozilmaydi
 * va rate-limit kerak emas.
 */
export async function GET(
	req: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params;
	const lang = new URL(req.url).searchParams.get("lang") ?? "uz";
	if (!isValidSlug(slug) || !isValidLang(lang)) {
		return NextResponse.json({ error: "bad_request" }, { status: 400, headers: NO_STORE });
	}
	const ipHash = await hashIp(clientIp(req.headers));
	return NextResponse.json({ alias: aliasFor(ipHash, slug, lang) }, { headers: NO_STORE });
}
