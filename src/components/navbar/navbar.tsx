"use client";
import Link from "next/link";
import { MenuItem } from "./menu-items";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LANGS = ["uz", "ru", "en"];

export default function Navbar({ items }: { items: MenuItem[] }) {
	const { lang } = useParams();
	const router = useRouter();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const locale = pathname
		.split("/")
		.filter((path) => path !== lang)
		.join("/");

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 lg:px-0">
			<nav
				className={`mt-4 w-full max-w-3xl rounded-2xl glass transition-all duration-300 ${
					scrolled ? "shadow-[0_10px_40px_-18px_rgba(225,29,72,0.28)]" : ""
				}`}
			>
				<div className="flex items-center justify-between gap-2 px-3 py-2">
					{/* Logo */}
					<Link
						href={`/${lang}`}
						className="font-display font-bold text-lg px-2 select-none"
					>
						<span className="gradient-text">{`</>`}</span>
					</Link>

					{/* Desktop menu */}
					<ul className="hidden md:flex items-center gap-1 text-sm font-medium">
						{items.map((item) => (
							<li key={item.href}>
								<Link
									href={`/${lang}${item.href}`}
									className="px-3 py-2 rounded-lg text-muted hover:text-ink hover:bg-black/[0.03] transition-colors"
								>
									{item.title}
								</Link>
							</li>
						))}
					</ul>

					{/* Right: language + mobile toggle */}
					<div className="flex items-center gap-1">
						<div className="flex items-center rounded-lg border border-line p-0.5">
							{LANGS.map((l) => (
								<button
									key={l}
									onClick={() => router.push(`/${l}${locale ? `/${locale.replace(/^\//, "")}` : ""}`)}
									className={`px-2 py-1 rounded-md text-xs font-semibold uppercase transition-colors ${
										lang === l
											? "bg-accent text-paper"
											: "text-soft hover:text-ink"
									}`}
								>
									{l}
								</button>
							))}
						</div>

						<button
							aria-label="Menu"
							onClick={() => setOpen((v) => !v)}
							className="md:hidden p-2 rounded-lg text-muted hover:text-ink hover:bg-black/[0.03]"
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
					<ul className="md:hidden border-t border-line px-2 py-2 flex flex-col">
						{items.map((item) => (
							<li key={item.href}>
								<Link
									href={`/${lang}${item.href}`}
									onClick={() => setOpen(false)}
									className="block px-3 py-2.5 rounded-lg text-muted hover:text-ink hover:bg-black/[0.03] transition-colors"
								>
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				)}
			</nav>
		</div>
	);
}
