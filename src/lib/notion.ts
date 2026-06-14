import { cache } from "react";
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
		lang: p.Lang?.select?.name || "uz",
	};
}

const getRawPosts = cache(async (): Promise<BlogPostMeta[]> => {
	if (!TOKEN || !DB_ID) return [];
	const posts: BlogPostMeta[] = [];
	let cursor: string | undefined;
	try {
		do {
			const res = await fetch(`${NOTION_API}/databases/${DB_ID}/query`, {
				method: "POST",
				headers: headers(),
				body: JSON.stringify({
					filter: { property: "Published", checkbox: { equals: true } },
					sorts: [{ property: "Date", direction: "descending" }],
					...(cursor ? { start_cursor: cursor } : {}),
				}),
				next: { revalidate: 300 },
			});
			if (!res.ok) break;
			const data = await res.json();
			posts.push(...(data.results ?? []).map(toMeta));
			cursor = data.has_more ? data.next_cursor : undefined;
		} while (cursor);
	} catch {
		/* bo'sh/qisman qaytadi */
	}
	return posts;
});

/** lang qatori, yo'q bo'lsa uz fallback; Date desc tartibida */
export async function getPublishedPosts(lang: string): Promise<BlogPostMeta[]> {
	const raw = await getRawPosts();
	const bySlug = new Map<string, BlogPostMeta[]>();
	for (const p of raw) {
		const arr = bySlug.get(p.slug) ?? [];
		arr.push(p);
		bySlug.set(p.slug, arr);
	}
	return Array.from(bySlug.values())
		.map((rows) => pickLang(rows, lang))
		.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(lang: string, slug: string): Promise<BlogPostMeta | null> {
	const raw = (await getRawPosts()).filter((p) => p.slug === slug);
	if (raw.length === 0) return null;
	return pickLang(raw, lang);
}

const PROJECTS_DB_ID = process.env.NOTION_PROJECTS_DB_ID;

export type ProjectMeta = {
	id: string;
	slug: string;
	title: string;
	description: string;
	tags: string[];
	category: string;
	link?: string;
	private: boolean;
	cover?: string;
	hasCaseStudy: boolean;
	lang: string;
	order: number;
};

function fileUrl(filesProp: any): string | undefined {
	const f = (filesProp?.files ?? [])[0];
	if (!f) return undefined;
	return f.type === "external" ? f.external?.url : f.file?.url;
}

function toProject(page: any): ProjectMeta {
	const p = page.properties;
	return {
		id: page.id,
		slug: plain(p.Slug?.rich_text) || page.id,
		title: plain(p.Title?.title),
		description: plain(p.Description?.rich_text),
		tags: (p.Tags?.multi_select ?? []).map((t: any) => t.name),
		category: plain(p.Category?.rich_text),
		link: p.Link?.url || undefined,
		private: p.Private?.checkbox ?? false,
		cover: fileUrl(p.Cover),
		hasCaseStudy: p.HasCaseStudy?.checkbox ?? false,
		lang: p.Lang?.select?.name || "uz",
		order: p.Order?.number ?? 0,
	};
}

const getRawProjects = cache(async (): Promise<ProjectMeta[]> => {
	if (!TOKEN || !PROJECTS_DB_ID) return [];
	const projects: ProjectMeta[] = [];
	let cursor: string | undefined;
	try {
		do {
			const res = await fetch(`${NOTION_API}/databases/${PROJECTS_DB_ID}/query`, {
				method: "POST",
				headers: headers(),
				body: JSON.stringify({
					filter: { property: "Published", checkbox: { equals: true } },
					...(cursor ? { start_cursor: cursor } : {}),
				}),
				next: { revalidate: 300 },
			});
			if (!res.ok) break;
			const data = await res.json();
			projects.push(...(data.results ?? []).map(toProject));
			cursor = data.has_more ? data.next_cursor : undefined;
		} while (cursor);
	} catch {
		/* empty */
	}
	return projects;
});

function pickLang<T extends { lang: string }>(rows: T[], lang: string): T {
	return rows.find((r) => r.lang === lang) ?? rows.find((r) => r.lang === "uz") ?? rows[0];
}

export async function getProjects(lang: string): Promise<ProjectMeta[]> {
	const raw = await getRawProjects();
	const bySlug = new Map<string, ProjectMeta[]>();
	for (const p of raw) {
		const arr = bySlug.get(p.slug) ?? [];
		arr.push(p);
		bySlug.set(p.slug, arr);
	}
	return Array.from(bySlug.values())
		.map((rows) => pickLang(rows, lang))
		.sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(lang: string, slug: string): Promise<ProjectMeta | null> {
	const raw = (await getRawProjects()).filter((p) => p.slug === slug);
	if (raw.length === 0) return null;
	return pickLang(raw, lang);
}

/** Case study body bloklari — mavjud getBlocks qayta ishlatiladi */
export async function getProjectBlocks(pageId: string): Promise<any[]> {
	return getBlocks(pageId);
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
