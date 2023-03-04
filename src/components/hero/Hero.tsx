import React from 'react'
import { motion } from 'framer-motion'
import { useMenu } from '@/hooks'
import { DataType } from '@/pages/types'

const Hero = ({ data }: { data: DataType['hero'] }) => {
	const { show, toggleMenu } = useMenu()

	return (
		<section className='pt-20 border-b dark:border-b-gray-700 '>
			<div className='py-20'>
				<h1 className='text-3xl leading-relaxed'>
					{data.title}
					<motion.span
						onMouseEnter={toggleMenu}
						onMouseLeave={toggleMenu}
						className='inline-block'
						animate={{
							rotate: show
								? [0, -10, 10, -10, 10, -10, 10, 0]
								: 360
						}}
					>
						{data.icon}
					</motion.span>
				</h1>
				<p className='leading-relaxed tracking-wide'>
					{data.desc}
				</p>
			</div>
		</section>
	)
}

export default Hero
