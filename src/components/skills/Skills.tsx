import React, { FC } from 'react'
import SkillsList from './SkillsList'
import { DataType } from '@/pages/types'
import { motion } from 'framer-motion'
import { VariantType } from './types'
import { Section } from '../core'

const divVariants: VariantType = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.5,
			delayChildren: 0.3,
			when: 'beforeChildren'
		}
	}
}

interface Props {
	skills: DataType['skills']
}

const Skills: FC<Props> = ({ skills }) => {
	return (
		<Section title='Skills 🛠'>
			<div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10'>
				{skills.map((skill, index) => {
					return (
						<SkillsList
							key={index}
							skill={skill}
						/>
					)
				})}
			</div>
		</Section>
	)
}

export default Skills
