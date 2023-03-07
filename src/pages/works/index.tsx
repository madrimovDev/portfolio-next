import React from 'react'
import path from 'path'
import fs from 'fs/promises'
import { GetStaticProps } from 'next'
import { BsGithub } from 'react-icons/bs'
import { DataType } from '../types'
import { Section, ImageView } from '@/components/core'

const Works = ({ result }: { result: DataType }) => {
	return (
		<Section title='Works'>
			<div className='grid grid-cols-2 gap-4 md:gap-8'>
				{result.works.map((work, index) => {
					return (
						<div
							className='flex flex-col gap-2'
							key={index}
						>
							<ImageView img={work.img} />
							<div className='flex justify-between items-center'>
								<h4 className='text-lg font-bold'>
									{work.title}
								</h4>
								<a
									href={work.src}
									target='_blank'
									className='hover:underline hover:text-sky-500 hover:opacity-100 opacity-50 underline-offset-2 flex items-center gap-2'
								>
									Source <BsGithub />
								</a>
							</div>
						</div>
					)
				})}
			</div>
		</Section>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const dataDir = path.join(
		process.cwd(),
		'src/pages/api/hero/data.json'
	)
	const file = await fs.readFile(dataDir, {
		encoding: 'utf-8'
	})

	return {
		props: {
			result: JSON.parse(file) as unknown as DataType
		}
	}
}

export default Works
