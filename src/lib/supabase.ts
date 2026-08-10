import { PostComment, PostStats } from "~/types";

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const IP_SALT = process.env.IP_SALT ?? "";

if (URL && KEY && IP_SALT.length < 16) {
	// Tuzsiz SHA-256 — butun IPv4 fazosini GPU'da bir necha daqiqada teskari
	// aylantirib bo'ladi, ya'ni ip_hash amalda xom IP bilan barobar.
	// Supabase sozlangan, lekin tuz yo'q holat — bu konfiguratsiya xatosi.
	console.warn(
		"[supabase] IP_SALT o'rnatilmagan yoki juda qisqa — ip_hash himoyasiz. " +
			"`openssl rand -hex 32` bilan yarating va env ga qo'ying."
	);
}

const TIMEOUT_MS = 5000;

/**
 * PostgREST RPC chaqiruvi. Har qanday nosozlikda `null` qaytaradi —
 * chaqiruvchi hech qachon exception ko'rmaydi (Supabase yiqilsa ham
 * maqola render bo'lishi kerak).
 */
async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<T[] | null> {
	if (!URL || !KEY) return null;
	try {
		const res = await fetch(`${URL}/rest/v1/rpc/${fn}`, {
			method: "POST",
			headers: {
				apikey: KEY,
				Authorization: `Bearer ${KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(args),
			cache: "no-store",
			signal: AbortSignal.timeout(TIMEOUT_MS),
		});
		if (!res.ok) return null;
		return (await res.json()) as T[];
	} catch {
		return null;
	}
}

/** x-forwarded-for dagi birinchi manzil; topilmasa placeholder. */
export function clientIp(headers: Headers): string {
	const fwd = headers.get("x-forwarded-for");
	if (fwd) return fwd.split(",")[0].trim();
	return headers.get("x-real-ip")?.trim() || "0.0.0.0";
}

/** Tuzlangan SHA-256. Xom IP hech qayerda saqlanmaydi. */
export async function hashIp(ip: string): Promise<string> {
	const data = new TextEncoder().encode(`${ip}|${IP_SALT}`);
	const digest = await crypto.subtle.digest("SHA-256", data);
	return Array.from(new Uint8Array(digest))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

/**
 * FAQAT RSC chaqiradi. post_stats qatorini ta'minlaydi va fikrlarni qaytaradi.
 * `failed` — Supabase javob bermadi; client bir marta qayta so'raydi.
 *
 * DIQQAT: bu YOZADIGAN yo'l. Ommaviy route handler'dan chaqirilmasin —
 * u yerda `getComments` ishlatiladi.
 */
export async function getPostThread(
	slug: string,
	lang: string
): Promise<{ comments: PostComment[]; failed: boolean }> {
	const rows = await rpc<PostComment>("get_post_thread", { p_slug: slug, p_lang: lang });
	if (rows === null) return { comments: [], failed: true };
	return { comments: rows, failed: false };
}

/** Faqat o'qish — ommaviy GET uchun. Noma'lum slug bazada iz qoldirmaydi. */
export async function getComments(slug: string, lang: string): Promise<PostComment[]> {
	const rows = await rpc<PostComment>("get_comments", { p_slug: slug, p_lang: lang });
	return rows ?? [];
}

export async function getStats(slug: string): Promise<PostStats | null> {
	const rows = await rpc<PostStats>("get_stats", { p_slug: slug });
	return rows?.[0] ?? null;
}

/** Noma'lum slug -> 0 qator -> null (route 404 qaytaradi). */
export async function incrementViews(slug: string): Promise<PostStats | null> {
	const rows = await rpc<PostStats>("increment_views", { p_slug: slug });
	return rows?.[0] ?? null;
}

export async function addClaps(
	slug: string,
	count: number,
	ipHash: string
): Promise<{ claps: number; remaining: number } | null> {
	const rows = await rpc<{ claps: number; remaining: number }>("add_claps", {
		p_slug: slug,
		p_count: count,
		p_ip_hash: ipHash,
	});
	return rows?.[0] ?? null;
}

export async function addComment(
	slug: string,
	lang: string,
	name: string,
	body: string,
	ipHash: string
): Promise<{ comment: PostComment | null; error: string | null }> {
	const rows = await rpc<PostComment & { error: string | null }>("add_comment", {
		p_slug: slug,
		p_lang: lang,
		p_name: name,
		p_body: body,
		p_ip_hash: ipHash,
	});
	const row = rows?.[0];
	if (!row) return { comment: null, error: "unavailable" };
	if (row.error) return { comment: null, error: row.error };
	return {
		comment: {
			id: row.id,
			author_name: row.author_name,
			body: row.body,
			created_at: row.created_at,
		},
		error: null,
	};
}
