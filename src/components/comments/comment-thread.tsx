"use client";

import { useEffect, useState, type FormEvent } from "react";
import { formatDate } from "~/lib/format-date";
import { Lang, PostComment } from "~/types";

type T = {
	empty: string;
	namePlaceholder: string;
	aliasHint: string;
	bodyPlaceholder: string;
	submit: string;
	sending: string;
	errorGeneric: string;
	errorRateLimit: string;
	errorDuplicate: string;
};

export default function CommentThread({
	slug,
	lang,
	initial,
	failed,
	t,
}: {
	slug: string;
	lang: Lang;
	initial: PostComment[];
	failed: boolean;
	t: T;
}) {
	const [items, setItems] = useState<PostComment[]>(initial);
	const [name, setName] = useState("");
	const [body, setBody] = useState("");
	const [website, setWebsite] = useState(""); // honeypot
	const [sending, setSending] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [alias, setAlias] = useState<string | null>(null);

	// Ism bo'sh qolsa qanday taxallus olishini oldindan ko'rsatamiz.
	// Bu endpoint bazaga tegmaydi — Supabase yiqilgan bo'lsa ham ishlaydi.
	useEffect(() => {
		let alive = true;
		fetch(`/api/posts/${slug}/alias?lang=${lang}`)
			.then((r) => (r.ok ? r.json() : null))
			.then((data: { alias: string } | null) => {
				if (alive && data) setAlias(data.alias);
			})
			.catch(() => {
				/* jim: maslahat ko'rsatilmaydi, forma baribir ishlaydi */
			});
		return () => {
			alive = false;
		};
	}, [slug, lang]);

	// ISR muvaffaqiyatli render'ni 5 daqiqaga keshlaydi. Agar server tomonda
	// Supabase javob bermagan bo'lsa, bo'sh ro'yxat keshlanib qolardi —
	// shuning uchun client bir marta qayta so'raydi.
	useEffect(() => {
		if (!failed) return;
		let alive = true;
		fetch(`/api/posts/${slug}/comments?lang=${lang}`)
			.then((r) => (r.ok ? r.json() : null))
			.then((data: { comments: PostComment[] } | null) => {
				if (alive && data) setItems(data.comments);
			})
			.catch(() => {
				/* jim */
			});
		return () => {
			alive = false;
		};
	}, [failed, slug, lang]);

	async function submit(e: FormEvent) {
		e.preventDefault();
		if (sending) return;
		setSending(true);
		setError(null);

		try {
			const res = await fetch(`/api/posts/${slug}/comments`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ lang, name, body, website }),
			});

			if (res.status === 429) {
				setError(t.errorRateLimit);
				return;
			}
			if (res.status === 409) {
				setError(t.errorDuplicate);
				return;
			}
			if (!res.ok) {
				setError(t.errorGeneric);
				return;
			}

			const data = (await res.json()) as { comment: PostComment | null };
			if (data.comment) {
				setItems((prev) => [data.comment as PostComment, ...prev]);
			}
			// Muvaffaqiyat — matnni tozalaymiz. Xatoda esa saqlab qolamiz.
			setBody("");
		} catch {
			setError(t.errorGeneric);
		} finally {
			setSending(false);
		}
	}

	return (
		<>
			<form onSubmit={submit} className="glass mt-6 rounded-2xl border border-line p-5">
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder={t.namePlaceholder}
					minLength={2}
					maxLength={40}
					className="w-full rounded-lg border border-line bg-surface2 px-3 py-2 text-sm outline-none focus:border-accent"
				/>
				{/* Maydon bo'sh turgandagina ko'rinadi — ism yozilsa yo'qoladi */}
				{alias && name.trim().length === 0 && (
					<p className="mt-1.5 text-xs text-soft">
						{t.aliasHint} <span className="font-mono text-accent">{alias}</span>
					</p>
				)}
				<textarea
					value={body}
					onChange={(e) => setBody(e.target.value)}
					placeholder={t.bodyPlaceholder}
					minLength={3}
					maxLength={2000}
					rows={4}
					required
					className="mt-3 w-full resize-y rounded-lg border border-line bg-surface2 px-3 py-2 text-sm outline-none focus:border-accent"
				/>

				{/* Honeypot — odam ko'rmaydi, bot to'ldiradi */}
				<input
					type="text"
					value={website}
					onChange={(e) => setWebsite(e.target.value)}
					tabIndex={-1}
					autoComplete="off"
					aria-hidden="true"
					className="absolute left-[-9999px] h-0 w-0 opacity-0"
				/>

				{error && <p className="mt-3 text-sm text-accent">{error}</p>}

				<button type="submit" disabled={sending} className="btn-amber mt-4 inline-flex">
					{sending ? t.sending : t.submit}
				</button>
			</form>

			{items.length === 0 ? (
				<p className="mt-8 text-sm text-soft">{t.empty}</p>
			) : (
				<ul className="mt-8 space-y-4">
					{items.map((c) => (
						<li key={c.id} className="glass rounded-2xl border border-line p-5">
							<div className="flex items-center gap-3">
								<span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface2 font-display text-sm font-bold text-accent">
									{c.author_name.slice(0, 1).toUpperCase()}
								</span>
								<div className="flex flex-col">
									<span className="text-sm font-semibold">{c.author_name}</span>
									<span className="font-mono text-xs text-soft">{formatDate(c.created_at.slice(0, 10), lang)}</span>
								</div>
							</div>
							<p className="mt-3 whitespace-pre-wrap text-sm text-muted">{c.body}</p>
						</li>
					))}
				</ul>
			)}
		</>
	);
}
