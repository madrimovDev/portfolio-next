import React, { forwardRef } from 'react'
import Link from 'next/link'
import { Button, Logo } from '../core'
import { BsSunFill } from 'react-icons/bs'
import { useColorMode } from '@/hooks'
import Menu from './Menu'
import DesktopMenu from './DesktopMenu'


const Navbar = forwardRef<HTMLElement, unknown>((_, ref) => {
	const { toggleTheme } = useColorMode()
	return (
		<nav ref={ref} className='fixed z-10 w-full top-0 left-0  dark:bg-zinc-900/80 bg-amber-100/80 backdrop-blur-sm'>
			<div className='max-w-screen-md mx-auto px-4 md:px-0 py-3 flex items-center justify-between'>
				<Link
					href='/'
					replace
				>
					<Logo />
				</Link>
				<div className='flex md:flex-grow justify-between items-center flex-row-reverse md:flex-row gap-4'>
					<Menu />
					<DesktopMenu />
					<Button
						aria-label='change-theme'
						onClick={toggleTheme}
						colorScheme='blue'
					>
						<BsSunFill />
					</Button>
				</div>
			</div>
		</nav>
	)
})

Navbar.displayName = 'Navbar'

export default Navbar
