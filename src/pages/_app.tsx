import { NextComponentType } from 'next'
import { AppProps } from 'next/app'
import '@/assets/styles/style.css'
import { Layout } from '@/components'

export default function MyApp({
	Component,
	pageProps
}: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}
