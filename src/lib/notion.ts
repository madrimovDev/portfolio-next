import { BlogPostMeta } from "~/types";

const NOTION_API = "https://api.notion.com/v1";
const TOKEN = process.env.NOTION_TOKEN;
const DB_ID = process.env.NOTION_BLOG_DB_ID;

const headers = () => ({
	Authorization: `Bearer ${TOKEN}`,
	"Notion-Version": "2022-06-28",
	"Content-Type": "application/json",
});

function plain(rt: any[]): string {
	return (rt ?? []).map((t) => t.plain_text).join("");
}

function toMeta(page: any): BlogPostMeta {
	const p = page.properties;
	return {
		id: page.id,
		slug: plain(p.Slug?.rich_text) || page.id,
		title: plain(p.Title?.title),
		description: plain(p.Description?.rich_text),
		date: p.Date?.date?.start ?? "",
		tags: (p.Tags?.multi_select ?? []).map((t: any) => t.name),
	};
}

export async function getPublishedPosts(): Promise<BlogPostMeta[]> {
	if (!TOKEN || !DB_ID) return [];
	try {
		const res = await fetch(`${NOTION_API}/databases/${DB_ID}/query`, {
			method: "POST",
			headers: headers(),
			body: JSON.stringify({
				filter: { property: "Published", checkbox: { equals: true } },
				sorts: [{ property: "Date", direction: "descending" }],
			}),
			next: { revalidate: 300 },
		});
		if (!res.ok) return [];
		const data = await res.json();
		return (data.results ?? []).map(toMeta);
	} catch {
		return [];
	}
}

export async function getPostBySlug(slug: string): Promise<BlogPostMeta | null> {
	const posts = await getPublishedPosts();
	return posts.find((p) => p.slug === slug) ?? null;
}

export async function getBlocks(pageId: string): Promise<any[]> {
	if (!TOKEN) return [];
	const blocks: any[] = [];
	let cursor: string | undefined;
	try {
		do {
			const url = new URL(`${NOTION_API}/blocks/${pageId}/children`);
			url.searchParams.set("page_size", "100");
			if (cursor) url.searchParams.set("start_cursor", cursor);
			const res = await fetch(url.toString(), {
				headers: headers(),
				next: { revalidate: 300 },
			});
			if (!res.ok) break;
			const data = await res.json();
			blocks.push(...(data.results ?? []));
			cursor = data.has_more ? data.next_cursor : undefined;
		} while (cursor);
	} catch {
		/* empty */
	}
	return blocks;
}
