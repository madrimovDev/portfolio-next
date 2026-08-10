import { NextResponse } from "next/server";
import { getStats } from "~/lib/supabase";
import { isValidSlug } from "~/lib/validate";

const NO_STORE = { "Cache-Control": "no-store" };

export async function GET(
	_req: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params;
	if (!isValidSlug(slug)) {
		return NextResponse.json({ error: "bad_slug" }, { status: 400, headers: NO_STORE });
	}
	const stats = await getStats(slug);
	if (!stats) {
		return NextResponse.json({ error: "not_found" }, { status: 404, headers: NO_STORE });
	}
	return NextResponse.json(stats, { headers: NO_STORE });
}
