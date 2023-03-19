import React, { useState } from 'react'

const AddComment = () => {
	return (
    <div className='p-4 pb-10 bg-amber-100 dark:bg-zinc-900 sticky bottom-0'>
      <h5 className='mb-4 text-base'>Add Your Comment</h5>
			<form className='flex flex-col gap-2 overflow-hidden'>
				<input
					type='email'
					placeholder='Email'
					name='email'
					className='px-3 py-1 rounded-md bg-stone-100'
				/>
				<textarea
					className='px-3 py-1 rounded-md bg-stone-100'
					name='comment'
					placeholder='Comment'
				></textarea>
				<button className='p-3 bg-sky-500 rounded-md text-white font-bold'>
					Comment
				</button>
			</form>
		</div>
	)
}

export default AddComment
