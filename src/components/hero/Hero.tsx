import React from 'react'
import Avatar from '@/assets/avatar.png'
import { useMenu } from '@/hooks'
import { DataType } from '@/pages/types'
import { Section } from '../core'
import Image from 'next/image'

const Hero = ({ data }: { data: DataType['hero'] }) => {
	return (
		<Section >
			<p className='leading-relaxed tracking-wide py-2 px-4 bg-gray-400/10 rounded-md'>
				{data.desc}
			</p>
			<div className='mt-10 flex flex-col md:flex-row md:items-center gap-4'>
				<div className='flex-grow'>
					<h1 className='text-3xl leading-relaxed'>
						{data.title}
					</h1>
					<p>
						{
							data.info
						}
					</p>
				</div>
				<Image
					blurDataURL={Avatar.blurDataURL}
					src={Avatar.src}
					className='rounded-full w-32 border-4 border-sky-500 self-center'
					alt='Avatar'
					width={Avatar.width}
					height={Avatar.height}
					priority
				/>
			</div>
		</Section>
	)
}

export default Hero
