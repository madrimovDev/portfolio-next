import React, { FC } from 'react'

interface Props {
	title?: string
}

const SectionTitle: FC<Props> = ({ title }) => {
	return (
		<h2 className='text-2xl font-bold underline mb-10'>
			{title}
		</h2>
	)
}

export default SectionTitle
