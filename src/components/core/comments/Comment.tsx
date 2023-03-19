import React from 'react'

const Comment = () => {
  return (
		<div className='p-4 flex flex-col gap-2 rounded-md bg-gray-500/10'>
			<p className='font-bold tracking-wider'>
				🗣️ email@email.com
			</p>
			<p className=''>
				Lorem ipsum dolor sit amet consectetur, adipisicing
				elit. Totam minima consequatur fugit labore
				quibusdam, qui deleniti obcaecati consectetur nam
				velit.
			</p>
		</div>
	)
}

export default Comment