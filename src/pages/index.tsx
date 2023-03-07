import path from 'path'
import fs from 'fs/promises'
import { GetStaticProps } from 'next'
import { Bio, Hero, Skills } from '@/components'
import { DataType } from './types'

export default function Home({
	result
}: {
	result: DataType
}) {
	return (
		<>
			<>
				<Hero data={result.hero} />
				<Bio bio={result.bio} />
				<Skills skills={result.skills} />
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
