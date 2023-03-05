import { Section } from '@/components/core'
import React from 'react'

const Works = () => {
	return (
		<Section title='Works'>
			<div className='grid grid-cols-2 gap-4 md:gap-8'>
				{new Array(10).fill('').map((_, index) => {
					return (
						<div className='flex flex-col gap-2' key={index}>
							<img
								className='w-full rounded-md'
								src='https://api.lorem.space/image/house'
								alt='asd'
              />
              <h4 className='text-lg font-bold'>Work Title</h4>
						</div>
					)
				})}
			</div>
		</Section>
	)
}

export default Works
