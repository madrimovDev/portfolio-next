import React from 'react'
import { Section } from '../core'

const Bio = () => {
	return (
		<Section title='Bio 🧑🏼‍💻'>
			<div className='grid grid-cols-1 md:grid-cols-[auto_90%] gap-y-3'>
				<h4 className='font-bold'>1999</h4>
				<p className='dark:text-white'>
					Born in Uzbekistan, Khiva
				</p>
				<h4 className='font-bold'>2015</h4>
				<p className='dark:text-white'>
					Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Rem, soluta deserunt. Fugit modi
					ipsam illo reiciendis animi deleniti, incidunt
					beatae.
				</p>
				<h4 className='font-bold'>2021 to present</h4>
				<p className='dark:text-white'>
					Lorem ipsum dolor sit amet, consectetur
					adipisicing elit. Rem, soluta deserunt. Fugit modi
					ipsam illo reiciendis animi deleniti, incidunt
					beatae.
				</p>
			</div>
		</Section>
	)
}

export default Bio
