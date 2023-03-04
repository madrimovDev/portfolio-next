import { Hero, Iam, Navbar, Skills } from '@/components'
import { GetStaticProps } from 'next'
import { DataType } from './types';

export default function Home({ result }: { result: DataType }) {
	console.log(result);
	
	return (
		<>
			<div className='container px-4 md:px-0 max-w-screen-sm mx-auto'>
				<Navbar />
				<Hero data={result.hero} />
				<Iam />
				<Skills />
			</div>
		</>
	)
}

export const getStaticProps: GetStaticProps = async (context) => {
	const response = await fetch('/api/hero')
	const result = await response.json()
	return {
		props: {
			result: result
		}
	}
}
