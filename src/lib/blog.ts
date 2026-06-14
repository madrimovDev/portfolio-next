import { posts, BlogPost } from "~/content/blog/posts";

/** Barcha postlar, sanasi bo'yicha kamayish tartibida (yangi birinchi) */
export function getPosts(): BlogPost[] {
	return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** slug bo'yicha bitta post; topilmasa null */
export function getPostBySlug(slug: string): BlogPost | null {
	return posts.find((p) => p.slug === slug) ?? null;
}

/** statik generatsiya uchun barcha slug'lar */
export function getAllPostSlugs(): string[] {
	return posts.map((p) => p.slug);
}
