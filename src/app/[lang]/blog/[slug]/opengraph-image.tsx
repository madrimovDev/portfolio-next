import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getPostBySlug } from "~/lib/notion";
import { Lang } from "~/types";

export const revalidate = 300;
export const alt = "madrimov.uz — maqola";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Har maqola uchun Signal uslubidagi OG rasm (dark + amber).
 * Notion yiqilsa yoki post topilmasa generic fallback chiziladi — 500 bermaydi.
 */
export default async function OgImage({
	params,
}: {
	params: { lang: string; slug: string };
}) {
	const unbounded = await readFile(
		join(process.cwd(), "src/fonts/Unbounded-Bold.ttf")
	);

	let title = "Muhandislik maqolalari";
	let tag = "BLOG";
	let date = "";
	try {
		const post = await getPostBySlug(params.lang as Lang, params.slug);
		if (post) {
			title = post.title;
			tag = (post.tags[0] ?? "BLOG").toUpperCase();
			date = post.date;
		}
	} catch {
		/* generic fallback */
	}

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "72px 80px",
					backgroundColor: "#0e1013",
					backgroundImage:
						"radial-gradient(circle at 85% 10%, rgba(255,194,75,.16), transparent 55%)",
					color: "#f2f3f5",
					fontFamily: "Unbounded",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
					<div
						style={{
							display: "flex",
							width: 14,
							height: 14,
							borderRadius: 999,
							backgroundColor: "#FFC24B",
						}}
					/>
					<div
						style={{
							display: "flex",
							fontSize: 26,
							color: "#FFC24B",
							letterSpacing: 3,
						}}
					>
						{tag}
					</div>
				</div>
				<div
					style={{
						display: "flex",
						fontSize: title.length > 60 ? 50 : 64,
						fontWeight: 700,
						lineHeight: 1.12,
						letterSpacing: -2,
						maxWidth: 1000,
					}}
				>
					{title}
				</div>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						borderTop: "2px solid rgba(255,255,255,.14)",
						paddingTop: 28,
					}}
				>
					<div style={{ display: "flex", fontSize: 28 }}>madrimov.uz</div>
					<div style={{ display: "flex", fontSize: 24, color: "#888E96" }}>
						{date}
					</div>
				</div>
			</div>
		),
		{
			...size,
			fonts: [{ name: "Unbounded", data: unbounded, weight: 700, style: "normal" }],
		}
	);
}
