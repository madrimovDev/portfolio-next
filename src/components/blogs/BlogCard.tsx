import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { BsEye, BsHeart, BsViewList } from 'react-icons/bs'

const BlogCard = ({blog}: {blog: number}) => {
  useEffect(() => {

  }, [])
	return (
		<div className=''>
			<Link href={'blogs/' + blog}>
				<Image
					src='https://api.lorem.space/image/house'
					className='w-full rounded-md'
					alt='cars'
					width={200}
					height={200}
				/>
			</Link>
			<div className='p-2 flex flex-col md:flex-row justify-between items-start md:items-center'>
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
