import { NextResponse } from "next/server";
import { incrementViews } from "~/lib/supabase";
import { isValidSlug } from "~/lib/validate";

const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(
	_req: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params;
	if (!isValidSlug(slug)) {
		return NextResponse.json({ error: "bad_slug" }, { status: 400, headers: NO_STORE });
	}
	// Qator faqat RSC (get_post_thread) tomonidan yaratiladi — bu yerda
	// yo'q slug qator YARATMAYDI, 404 qaytaradi. Cheklanmagan o'sishga qarshi himoya.
	const stats = await incrementViews(slug);
	if (!stats) {
		return NextResponse.json({ error: "not_found" }, { status: 404, headers: NO_STORE });
	}
	return NextResponse.json(stats, { headers: NO_STORE });
}
