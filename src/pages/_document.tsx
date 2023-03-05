import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-white dark:bg-stone-900 text-gray-500 transition-all'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
