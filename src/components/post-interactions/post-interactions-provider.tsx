"use client";

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";

type Ctx = {
	views: number | null;
	claps: number | null;
	addClap: () => void;
	exhausted: boolean;
};

const PostInteractionsContext = createContext<Ctx>({
	views: null,
	claps: null,
	addClap: () => {},
	exhausted: false,
});

export function usePostInteractions() {
	return useContext(PostInteractionsContext);
}

const DAY_MS = 24 * 60 * 60 * 1000;
const FLUSH_MS = 800;

/** Bir maqola / bir brauzer / 24 soat — ko'rish faqat bir marta sanaladi. */
function shouldCountView(slug: string): boolean {
	try {
		const key = `mv:viewed:${slug}`;
		const prev = Number(window.localStorage.getItem(key) ?? 0);
		if (Date.now() - prev < DAY_MS) return false;
		window.localStorage.setItem(key, String(Date.now()));
		return true;
	} catch {
		// localStorage o'chirilgan — sanaymiz, zarari yo'q
		return true;
	}
}

/**
 * Maqola raqamlari. Sahifa ISR bilan statik bo'lgani uchun raqamlar
 * faqat hidratsiyadan keyin client'da yuklanadi — aks holda muzlab qolardi.
 * Nosozlikda `null` bo'lib qoladi va hech narsa ko'rsatilmaydi.
 */
export default function PostInteractionsProvider({
	slug,
	children,
}: {
	slug: string;
	children: ReactNode;
}) {
	const [views, setViews] = useState<number | null>(null);
	const [claps, setClaps] = useState<number | null>(null);
	const [exhausted, setExhausted] = useState(false);

	const pending = useRef(0);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		let alive = true;
		const count = shouldCountView(slug);
		const req = count
			? fetch(`/api/posts/${slug}/view`, { method: "POST" })
			: fetch(`/api/posts/${slug}/stats`);

		req
			.then((r) => (r.ok ? r.json() : null))
			.then((data: { views: number; claps: number } | null) => {
				if (!alive || !data) return;
				setViews(data.views);
				setClaps(data.claps);
			})
			.catch(() => {
				/* jim: raqam ko'rsatilmaydi */
			});

		return () => {
			alive = false;
		};
	}, [slug]);

	const flush = useCallback(() => {
		const n = pending.current;
		pending.current = 0;
		timer.current = null;
		if (n <= 0) return;

		fetch(`/api/posts/${slug}/claps`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ count: n }),
		})
			.then((r) => (r.ok ? r.json() : null))
			.then((data: { claps: number; remaining: number } | null) => {
				if (!data) throw new Error("failed");
				// Server haqiqatni biladi — optimistik qiymatni moslashtiramiz
				setClaps(data.claps);
				setExhausted(data.remaining <= 0);
			})
			.catch(() => {
				// Optimistik qiymatni orqaga qaytaramiz
				setClaps((c) => (c === null ? c : Math.max(0, c - n)));
			});
	}, [slug]);

	const addClap = useCallback(() => {
		if (exhausted) return;
		setClaps((c) => (c === null ? 1 : c + 1));
		pending.current += 1;
		// Bir so'rovda maksimum 10 ta — server ham qisadi
		if (pending.current >= 10) {
			if (timer.current) clearTimeout(timer.current);
			flush();
			return;
		}
		if (timer.current) clearTimeout(timer.current);
		timer.current = setTimeout(flush, FLUSH_MS);
	}, [exhausted, flush]);

	// Sahifadan chiqishda yig'ilgan qarsaklarni yuborib qolamiz.
	// `keepalive` — sahifa yopilayotgan bo'lsa ham so'rov yetib boradi.
	useEffect(() => {
		return () => {
			if (timer.current) clearTimeout(timer.current);
			const n = pending.current;
			if (n <= 0) return;
			pending.current = 0;
			fetch(`/api/posts/${slug}/claps`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ count: n }),
				keepalive: true,
			}).catch(() => {
				/* jim: sahifa allaqachon yopilgan */
			});
		};
	}, [slug]);

	return (
		<PostInteractionsContext.Provider value={{ views, claps, addClap, exhausted }}>
			{children}
		</PostInteractionsContext.Provider>
	);
}
