import React from 'react'
import Avatar from '@/assets/avatar.png'
import Image from 'next/image'
import { Button } from '../core'
import Link from 'next/link'
import { BsTelegram } from 'react-icons/bs'

const Iam = () => {
	return (
		<section className='py-10 border-b dark:border-b-gray-700 '>
			<h4 className='text-gray-400 mb-4 text-center md:text-right'>
				Front-end Engineer
			</h4>
			<div className='flex flex-col items-center md:flex-row gap-10 '>
				<Image
					blurDataURL={Avatar.blurDataURL}
					src={Avatar.src}
					className='rounded-full w-full md:w-40'
					alt='Avatar'
					width={Avatar.width}
					height={Avatar.height}
					priority
				/>
				<div>
					<p className='text-justify mb-8'>
						Lorem ipsum, dolor sit amet consectetur
						adipisicing elit. Vero impedit optio in, eum
						asperiores nesciunt mollitia distinctio
						aspernatur architecto neque quos aliquam.
						Perferendis fuga, tenetur nihil iste rerum quis
						nulla?
					</p>
					<Button
						as={Link}
						href='/'
						colorScheme='blue'
						variant='button'
					>
						<BsTelegram /> Hire Me
					</Button>
				</div>
			</div>
		</section>
	)
}

export default Iam
