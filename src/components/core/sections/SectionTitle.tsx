import React, { FC } from 'react'

interface Props {
	title?: string
}

const SectionTitle: FC<Props> = ({ title }) => {
	return (
		<h4 className='text-2xl font-bold underline mb-10'>
			{title}
		</h4>
	)
}

export default SectionTitle
