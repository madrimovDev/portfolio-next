import React, { FC, PropsWithChildren, useRef } from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import { Fira_Mono } from 'next/font/google'

const fira = Fira_Mono({
	weight: ['400', '700', '500'],
	subsets: ['latin']
})

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const ref = useRef<HTMLElement>(null)
	const padding = ref.current ? ref.current.clientHeight : 0

	return (
		<div
			style={{
				paddingTop: padding
			}}
			className={`container px-4 md:px-0 max-w-screen-sm mx-auto ${fira.className}`}
		>
			<Navbar ref={ref} />
			{children}
			<Footer />
		</div>
	)
}

export default Layout
