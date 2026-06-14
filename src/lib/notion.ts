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
	};
}

export async function getPublishedPosts(): Promise<BlogPostMeta[]> {
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
}

export async function getPostBySlug(slug: string): Promise<BlogPostMeta | null> {
	const posts = await getPublishedPosts();
	return posts.find((p) => p.slug === slug) ?? null;
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
	};
}

export const getProjects = cache(async (): Promise<ProjectMeta[]> => {
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
					sorts: [{ property: "Order", direction: "ascending" }],
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

export async function getProjectBySlug(slug: string): Promise<ProjectMeta | null> {
	const projects = await getProjects();
	return projects.find((p) => p.slug === slug) ?? null;
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
