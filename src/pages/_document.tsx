import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

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
				<Script
					async
					src='https://www.googletagmanager.com/gtag/js?id=G-6BSPQHBC28'
				/>
				<Script
					id='google-analytics'
					strategy='afterInteractive'
					dangerouslySetInnerHTML={{
						__html: `  window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
					
						gtag('config', 'G-6BSPQHBC28');`
					}}
				/>
			</body>
		</Html>
	)
}
