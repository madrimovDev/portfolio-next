import React from 'react'
import BlogCard from './BlogCard'

const BlogCards = () => {
	return (
		<div className='grid grid-cols-2 gap-4 md:gap-8'>
			{Array.from(new Array(10).keys()).map((b, i) => (
				<BlogCard key={i} blog={i} />
			))}
		</div>
	)
}

export default BlogCards
