import { NextComponentType } from 'next'
import { AppProps } from 'next/app'
import '@/assets/styles/style.css'

export default function MyApp({Component, pageProps}: AppProps) {
  return <Component {...pageProps}/>
}