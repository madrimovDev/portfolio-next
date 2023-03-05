import React, { FC, PropsWithChildren, useRef } from 'react'
import Navbar from './navbar/Navbar'
import Footer from './footer/Footer'
import {motion} from 'framer-motion'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	
  const ref = useRef<HTMLElement>(null)
  const padding = ref.current ? ref.current.clientHeight : 0
  
	return (
		<div
			style={{
				paddingTop: padding
			}}
			className='container px-4 md:px-0 max-w-screen-sm mx-auto'
    >
      <motion.div animate={{
        rotate: 360,
        transition: {
          type: 'tween',
          repeat: Infinity,
          repeatType: 'loop',
          duration: 24
        }
      }} className='fixed inset-0 opacity-30 -z-10'>
        <div  className='w-1/2 absolute top-0 left-0 rounded-full blur-[200px] opacity-50 aspect-square bg-gradient-to-tr to-blue-500 from-violet-500'/>
        <div  className='w-1/2 absolute bottom-0 right-0 rounded-full blur-[200px] opacity-20 aspect-square bg-gradient-to-tr to-red-500 from-violet-500'/>
      </motion.div>
			<Navbar ref={ref} />
      {children}
      <Footer />
		</div>
	)
}

export default Layout
