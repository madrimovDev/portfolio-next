import React, { FC } from 'react'
import { Section } from '../core'
import { ArrayElement } from '../types'
import { DataType } from '@/pages/types'

interface Props {
	bio: DataType['bio']
}

const Bio: FC<Props> = ({ bio }) => {
	return (
		<Section title='Bio 🧑🏼‍💻'>
			<div className='grid grid-cols-[auto_90%] gap-y-3 gap-x-2'>
				{bio.map((b, index) => {
					return (
						<>
							<h4 className='font-bold'>{b.year}</h4>
							<p className='dark:text-white'>{b.info}</p>
						</>
					)
				})}
			</div>
		</Section>
	)
}

export default Bio
