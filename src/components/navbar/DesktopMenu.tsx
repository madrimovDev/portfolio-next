import Link from 'next/link'
import React from 'react'

const DesktopMenu = () => {

	return (

				<ul className='md:flex hidden items-center gap-4 ml-10'>
					<li>
						<Link
							className='hover:underline'
							href='works'
						>
							Works
						</Link>
					</li>
					<li>
						<Link
							className='hover:underline'
							href='/about'
						>
							About
						</Link>
					</li>
					<li>
						<Link
							className='hover:underline'
							href='works'
						>
							Contact
						</Link>
					</li>
				</ul>
	)
}

export default DesktopMenu
