import React, { useRef } from 'react'

const Logo = () => {
	const ref = useRef<HTMLSpanElement>(null)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	return (
		<span
			ref={ref}
			className='px-2 w-[200px] rounded-md inline-flex text-lg font-mono text-cyan-500 '
		>
			{'<madrimov/>'}
		</span>
	)
}

export default Logo
