import React from 'react'
import { Section } from '@/components/core'
import { GetStaticProps } from 'next'
import path from 'path'
import fs from 'fs/promises'
import { DataType } from '../types'
import Image from 'next/image'

const Works = ({ result }: { result: DataType }) => {	
	return (
		<Section title='Works'>
			<div className='grid grid-cols-2 gap-4 md:gap-8'>
				{result.works.map((_, index) => {
					return (
						<div
							className='flex flex-col gap-2'
							key={index}
						>
							<Image
								src={_.img}
								alt='works'
								width={200}
								height={200}
								className='w-full'
							/>
							<h4 className='text-lg font-bold'>
								{_.title}
							</h4>
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
