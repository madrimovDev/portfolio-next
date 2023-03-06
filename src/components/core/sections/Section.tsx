import React, { FC, ReactNode } from 'react'
import SectionTitle from './SectionTitle'

interface Props {
	title?: string
	children: ReactNode
}

const Section: FC<Props> = ({ children, title }) => {
	return (
		<section className='py-5 md:py-10'>
			{title && <SectionTitle title={title} />}
			{children}
		</section>
	)
}

export default Section
