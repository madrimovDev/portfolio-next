import React, { useRef } from 'react'
import { Button } from '../core'
import Link from 'next/link'
import {
	BsList,
	BsGithub,
	BsLinkedin
} from 'react-icons/bs'
import { motion } from 'framer-motion'
import {
	useMenu,
	useOutsideClick
} from '@/hooks'

const Menu = () => {
	const { show, closeMenu, toggleMenu } = useMenu()
	const ref = useRef<HTMLDivElement>(null)

	useOutsideClick(ref, () => closeMenu())

	return (
		<div
			ref={ref}
			className='relative block md:hidden'
		>
			<Button
				onClick={toggleMenu}
				colorScheme='green'
				className='!text-black dark:!text-white'
			>
				<BsList />
			</Button>
			<motion.div
				initial={{
					scale: 0,
					opacity: 0
				}}
				animate={{
					scale: show ? 1 : 0,
					opacity: show ? 1 : 0,
					transition: {
						staggerChildren: 0.2, 
						delayChildren: 0.2
					}
				}}
				className='absolute origin-top-right top-[140%] right-0'
			>
				<div className='bg-gray-700 text-white px-4 py-6 shadow-md dark:bg-gray-800 w-[200px] rounded-md'>
					<ul className='flex flex-col text-xl gap-3'>
						<li>
							<Link
								onClick={closeMenu}
								className='hover:underline'
								href='works'
							>
								Works
							</Link>
						</li>
						<li>
							<a
								onClick={closeMenu}
								href='https://github.com/madrimovDev'
								target='_blank'
								className='flex text-sky-400 items-center gap-2'
							>
								Github <BsGithub />
							</a>
						</li>
						<li>
							<a
								onClick={closeMenu}
								href='https://linkedin.com'
								target='_blank'
								className='flex text-sky-400 items-center gap-2'
							>
								Linkedin <BsLinkedin />
							</a>
						</li>
					</ul>
				</div>
			</motion.div>
		</div>
	)
}

export default Menu
