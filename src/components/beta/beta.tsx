"use client";
import { useState } from "react";

export default function Beta() {
	const [open, setOpen] = useState(true);
	if (!open) return null;
	return (
		<div className="fixed bottom-10 inset-x-0 w-full flex justify-center z-20 px-4">
			<div
				role="alert"
				className="alert alert-warning bg-warning/50 glass max-w-screen-sm flex items-center justify-between"
			>
				<span className="inline-flex items-center gap-2 text-xs sm:text-base">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					Sayt Test Rejimida Ishlamoqda
				</span>
				<button
					onClick={() => setOpen(false)}
					className="btn btn-primary btn-sm sm:btn-md"
				>
					Yopish
				</button>
			</div>
		</div>
	);
}

