import path from 'path'
import fs from 'fs/promises'
import { GetStaticProps } from 'next'
import { Bio, Hero, Skills } from '@/components'
import { DataType } from './types'
import Head from 'next/head'

export default function Home({
	result
}: {
	result: DataType
}) {
	return (
		<>
			<>
				<Head>
					<title>Madrimov&apos;s Life</title>
					<meta name="description" content={result.skills.map((_) => `${_.skills}`).join(' ')} />
					<meta name='author' content={result.hero.title} />
					<meta name="robots" content="index, follow" />
					<meta name='keywords' content='webkids, react, developer, javascript, Madrimov Xudoshukur, Xudoshukur, Madrimov, Typescript, Data, DATA LEARNING CENTER'/>
					<meta name="googlebots" content="index, follow" />
				</Head>
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
