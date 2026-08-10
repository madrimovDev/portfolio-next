import { NextResponse } from "next/server";
import { addClaps, clientIp, hashIp } from "~/lib/supabase";
import { isValidSlug } from "~/lib/validate";

const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(
	req: Request,
	{ params }: { params: Promise<{ slug: string }> }
) {
	const { slug } = await params;
	if (!isValidSlug(slug)) {
		return NextResponse.json({ error: "bad_slug" }, { status: 400, headers: NO_STORE });
	}

	let count = 1;
	try {
		const body = (await req.json()) as { count?: unknown };
		if (typeof body.count === "number" && Number.isFinite(body.count)) {
			count = body.count;
		}
	} catch {
		/* bo'sh body — 1 ta qarsak */
	}

	const ipHash = await hashIp(clientIp(req.headers));
	// Qisish SQL ichida ham bor (1..10) — bu yerda faqat aqlsiz qiymatni to'sib qolamiz
	const result = await addClaps(slug, Math.trunc(count), ipHash);
	if (!result) {
		return NextResponse.json({ error: "not_found" }, { status: 404, headers: NO_STORE });
	}
	return NextResponse.json(result, { headers: NO_STORE });
}
