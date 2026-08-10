"use client";

import { usePostInteractions } from "./post-interactions-provider";

/** Medium uslubidagi qarsak. Optimistik — bosilishi bilan raqam oshadi. */
export default function ClapButton({ hint }: { hint: string }) {
	const { claps, addClap, exhausted } = usePostInteractions();

	return (
		<div className="mt-12 flex items-center gap-4">
			<button
				type="button"
				onClick={addClap}
				disabled={exhausted}
				aria-label={hint}
				className={`glass flex h-14 w-14 items-center justify-center rounded-full border text-2xl transition
					${
						exhausted
							? "cursor-default border-line opacity-50"
							: "border-accent/40 hover:border-accent hover:scale-105 active:scale-95"
					}`}
			>
				👏
			</button>
			<div className="flex flex-col">
				<span className="font-mono text-lg text-accent">
					{claps === null ? " " : claps.toLocaleString("uz-UZ")}
				</span>
				<span className="text-xs text-soft">{hint}</span>
			</div>
		</div>
	);
}
