import React, {
	FC,
	PropsWithChildren,
	useEffect,
	useRef,
	useState
} from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import { Cabin } from 'next/font/google'

const fira = Cabin({
	weight: ['400', '700', '500', '600'],
	subsets: ['latin']
})

const Layout: FC<PropsWithChildren> = ({ children }) => {
	const ref = useRef<HTMLElement>(null)
	const [padding, setPadding] = useState(0)

	useEffect(() => {
		if (ref.current) {
			setPadding(ref.current.clientHeight)
		}
	}, [ref])

	return (
		<div
			style={{
				paddingTop: padding
			}}
			className={`container px-4 md:px-0 max-w-screen-sm mx-auto ${fira.className}`}
		>
			<Navbar ref={ref} />

			{children}
			<Footer />
		</div>
	)
}

export default Layout
