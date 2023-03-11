import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsEye, BsHeart, BsViewList } from 'react-icons/bs'

const BlogCard = () => {
	return (
		<div className=''>
			<Link href=''>
				<Image
					src='https://api.lorem.space/image/house'
					className='w-full rounded-md'
					alt='cars'
					width={200}
					height={200}
				/>
			</Link>
			<div className='p-2 flex justify-between items-center'>
				<h4 className='text-xl'>Card Title</h4>
				<div className='flex gap-2'>
					<button className='flex items-center gap-2'>
						<BsHeart /> 120
					</button>
					<button className='flex items-center gap-2'>
						<BsEye /> 230
					</button>
				</div>
			</div>
		</div>
	)
}

export default BlogCard
