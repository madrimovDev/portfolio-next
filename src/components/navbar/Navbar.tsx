import React from 'react'
import Link from 'next/link'
import { Button, Logo } from '../core'
import { BsSunFill } from 'react-icons/bs'
import { useColorMode, useMenu } from '@/hooks'
import Menu from './Menu'
import DesktopMenu from './DesktopMenu'

const Navbar = () => {
	const { toggleTheme } = useColorMode()
	return (
		<nav className='fixed z-10 w-full top-0 left-0 px-4 py-3 bg-gray-800/5 backdrop-blur-sm shadow-sm'>
			<div className='max-w-screen-md mx-auto flex items-center justify-between'>
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
						onClick={toggleTheme}
						colorScheme='blue'
					>
						<BsSunFill />
					</Button>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
