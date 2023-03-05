import { Hero, Iam, Navbar, Skills } from '@/components'
import { GetStaticProps } from 'next'
import { DataType } from './types'
import path from 'path'
import fs from 'fs/promises'

export default function Home({
	result
}: {
	result: DataType
	}) {
	
	return (
		<>
			<>
				<Hero data={result.hero} />
				<Iam />
				<Skills skills={result.skills}/>
			</>
		</>
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
