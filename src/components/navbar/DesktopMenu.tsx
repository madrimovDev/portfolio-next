import Link from 'next/link'
import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import navigation from './navigation'

const DesktopMenu = () => {
	return (
		<ul className='md:flex hidden items-center gap-4 ml-10'>
			{
				navigation.map((nav) => (
					<Link key={nav.id} href={nav.slug}>{nav.title}</Link>
				))
			}
			<li>
				<a
					href='https://github.com/madrimovDev'
					target='_blank'
					className='flex items-center gap-2'
				>
					Github <BsGithub />
				</a>
			</li>
			<li>
				<a
					href='http://linkedin.com'
					className='flex items-center gap-2'
					target='_blank'
				>
					Linkedin <BsLinkedin />
				</a>
			</li>
		</ul>
	)
}

export default DesktopMenu
