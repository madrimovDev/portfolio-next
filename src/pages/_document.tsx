import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='en'>
			<Head />
			<body
				style={{}}
				className='bg-amber-100 dark:bg-zinc-900 dark:text-white transition-all text-sm md:text-base'
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
