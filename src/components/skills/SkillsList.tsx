import React, { FC } from 'react'
import {
	motion
} from 'framer-motion'
import { DataType } from '@/pages/types'
import { VariantType } from './types'


const ulVariantse: VariantType = {
	hidden: {
		y: -20,
		opacity: 0,
	},
	visible: {
		y: 0,
    opacity: 1,
		transition: {
			type: 'spring',
			staggerChildren: 0.1,
			delayChildren: 0.3
		}
	}
}

const liVariants: VariantType = {
	hidden: {
		opacity: 0,
		y: -6
	},
	visible: {
		opacity: 1,
		y: 0
	}
}

type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[]
		? ElementType
		: never

interface Props {
	skill: ArrayElement<DataType['skills']>
}

const SkillsList: FC<Props> = ({ skill }) => {
	return (
		<motion.ul
      variants={ulVariantse}
      initial='hidden'
      whileInView='visible'
			viewport={{
				once: true,
				margin: '-100px'
			}}
			className='list-disc w-full md:w-auto border p-4 rounded-md border-gray-700 flex-grow dark:text-white list-inside flex flex-col gap-2'
		>
			<motion.li
				variants={liVariants}
				className='text-xl text-gray-400 list-none'
			>
				{skill.title}
			</motion.li>
			{skill.skills.map((skill, index) => {
				return (
					<motion.li
						variants={liVariants}
						key={skill + index}
					>
						{skill}
					</motion.li>
				)
			})}
		</motion.ul>
	)
}

export default SkillsList
