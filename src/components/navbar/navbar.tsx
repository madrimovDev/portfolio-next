"use client";
import Link from "next/link";
import { MenuItem } from "./menu-items";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const LANGS = ["uz", "ru", "en"] as const;

export default function Navbar({ items }: { items: MenuItem[] }) {
	const { lang } = useParams();
	const router = useRouter();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	// path without the leading /<lang> segment, used to preserve location on switch
	const locale = pathname
		.split("/")
		.filter((path) => path !== lang)
		.join("/");

	const isActive = (href: string) => {
		const current = `/${locale.replace(/^\//, "")}`;
		// hash links are in-page scroll targets, never an "active" page
		if (href.includes("#")) return false;
		if (href === "/") return current === "/";
		return current === href || current.startsWith(`${href}/`);
	};

	return (
		<nav className="sticky top-0 z-50 glass border-b border-white/[0.12] backdrop-blur-[36px] shadow-[inset_0_1px_0_rgba(255,255,255,.3),0_10px_30px_-18px_rgba(0,0,0,.6)]">
			<div className="mx-auto flex h-[70px] max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
				{/* Logo */}
				<Link
					href={`/${lang}`}
					className="flex items-center gap-[11px] select-none"
				>
					<span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] border-[1.5px] border-accent font-display text-sm font-bold text-accent">
						MX
					</span>
					<span className="font-display text-base font-medium tracking-[-.01em] text-fg">
						madrimov<span className="text-accent">.uz</span>
					</span>
				</Link>

				{/* Desktop menu */}
				<ul className="hidden items-center gap-7 md:flex">
					{items.map((item) => (
						<li key={item.href}>
							<Link
								href={`/${lang}${item.href}`}
								className={`block whitespace-nowrap text-sm transition-colors ${
									isActive(item.href)
										? "font-medium text-accent"
										: "text-muted hover:text-fg"
								}`}
							>
								{item.title}
							</Link>
						</li>
					))}
				</ul>

				{/* Right: language switcher + mobile toggle */}
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-[3px] font-mono shadow-[inset_0_1px_0_rgba(255,255,255,.1)] backdrop-blur-[12px]">
						{LANGS.map((l) => (
							<button
								key={l}
								onClick={() =>
									router.push(
										`/${l}${locale ? `/${locale.replace(/^\//, "")}` : ""}`
									)
								}
								className={`rounded-full px-3 py-1 text-xs uppercase tracking-[.04em] transition-colors ${
									lang === l
										? "bg-accent font-semibold text-surface"
										: "text-[#888E96] hover:text-fg"
								}`}
							>
								{l}
							</button>
						))}
					</div>

					<button
						aria-label="Menu"
						onClick={() => setOpen((v) => !v)}
						className="rounded-lg p-2 text-muted transition-colors hover:text-fg md:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d={open ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"}
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* Mobile menu */}
			{open && (
				<ul className="flex flex-col border-t border-line px-5 py-2 md:hidden">
					{items.map((item) => (
						<li key={item.href}>
							<Link
								href={`/${lang}${item.href}`}
								onClick={() => setOpen(false)}
								className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
									isActive(item.href)
										? "text-accent"
										: "text-muted hover:text-fg"
								}`}
							>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
			)}
		</nav>
	);
}
