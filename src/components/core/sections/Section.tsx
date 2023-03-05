import React, { FC, ReactNode } from 'react'
import SectionTitle from './SectionTitle'

interface Props {
	title?: string
	children: ReactNode
}

const Section: FC<Props> = ({ children, title }) => {
	return (
		<section className='py-10 border-b dark:border-b-gray-700'>
			<SectionTitle title={title} />
			{children}
		</section>
	)
}

export default Section
