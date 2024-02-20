"use client";
import Link from "next/link";
import { MenuItem } from "./menu-items";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Theme, useTheme } from "~/hooks/useTheme";

export default function Navbar({ items }: { items: MenuItem[] }) {
	const { lang } = useParams();
	const router = useRouter();
	const { theme, themes, changeTheme } = useTheme();
	const pathname = usePathname();
	const locale = pathname
		.split("/")
		.filter((path) => path !== lang)
		.join("/");

	return (
		<div className="fixed top-0 inset-x-0 flex justify-center px-2 lg:px-0 z-10">
			<div className="navbar glass max-w-screen-md rounded-box mt-4">
				<div className="navbar-start">
					<div className="dropdown">
						<div
							tabIndex={0}
							role="button"
							className="btn btn-ghost btn-sm lg:hidden"
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
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</div>
						<ul
							className="menu dropdown-content bg-base-100 shadow-xl min-w-max mt-2 rounded-box px-4"
							tabIndex={0}
						>
							{items.map((item) => {
								return (
									<li key={item.href}>
										<Link href={`/${lang}${item.href}`}>{item.title}</Link>
									</li>
								);
							})}
						</ul>
					</div>
					<a className="btn btn-ghost btn-sm lg:text-xl">{`</>`}</a>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-xs menu-horizontal px-1 font-semibold">
						{items.map((item) => {
							return (
								<li key={item.href}>
									<Link href={`/${lang}${item.href}`}>{item.title}</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="navbar-end">
					<div className="dropdown">
						<div
							role="button"
							className="btn btn-ghost btn-sm capitalize text-xs"
							tabIndex={0}
						>
							Theme {theme}
						</div>
						<ul
							className="dropdown-content menu bg-base-200"
							tabIndex={0}
						>
							{themes.map((th) => {
								return (
									<li
										onClick={() => changeTheme(th)}
										key={th}
										className={`btn btn-sm${
											theme === th ? "btn-primary" : "btn-ghost"
										}`}
									>
										{th}
									</li>
								);
							})}
						</ul>
					</div>
					<div className="dropdown">
						<div
							role="button"
							className="btn btn-ghost btn-sm capitalize text-xs"
							tabIndex={0}
						>
							{lang}
						</div>
						<ul
							className="dropdown-content menu bg-base-200"
							tabIndex={0}
						>
							{["uz", "ru", "en"].map((l) => {
								return (
									<li
										className="btn btn-ghost btn-xs min-w-10 capitalize"
										onClick={() => {
											router.push(`/${l}/${locale.substring(1)}`);
										}}
										key={l}
									>
										{l}
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

