"use client";

import { usePostInteractions } from "./post-interactions-provider";

/** Meta qatoridagi ko'rish soni. Ma'lumot yo'q bo'lsa joyni band qiladi (layout siljimasin). */
export default function ViewCount({ label }: { label: string }) {
	const { views } = usePostInteractions();
	return (
		<span className="font-mono text-xs text-soft" suppressHydrationWarning>
			{views === null ? " " : `${views.toLocaleString("uz-UZ")} ${label}`}
		</span>
	);
}
