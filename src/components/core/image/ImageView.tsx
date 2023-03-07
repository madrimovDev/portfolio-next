import React, { FC, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useOutsideClick } from '@/hooks'
import Button from '../buttons/Button'

interface ViewProps {
	close: () => void
	img: string
}

const CustomImage = motion(Image)

const View: FC<ViewProps> = ({ close, img }) => {
  const ref = useRef<HTMLImageElement>(null)
  
  useOutsideClick(ref, close)

	return (
		<motion.div
			initial={{
        opacity: 0,
			}}
			animate={{
        opacity: 1,
			}}
			exit={{
        opacity: 0,
			}}
			className='fixed w-full h-screen top-0 left-0 z-20 flex justify-center items-center bg-black/20 backdrop-blur'
    >
      <Button variant='button' className='absolute top-[5%] right-[5%]' colorScheme='red'>x</Button>
      <CustomImage
        initial={{
          y: -20
        }}
        animate={{
          y: 0
        }}
        exit={{
          y: 20
        }}
        ref={ref}
				src={img}
				alt={img}
				width={900}
				height={500}
				className='h-auto md:h-[90%] object-contain w-[90%] md:w-auto'
			/>
		</motion.div>
	)
}

interface Props {
	img: string
}

const ImageView: FC<Props> = ({ img }) => {
	const [show, setShow] = useState<boolean>(false)
	return (
		<>
			<Image
				onClick={() => setShow(true)}
				src={img}
				alt={img}
				width={200}
				height={200}
				className='w-full'
			/>
			<AnimatePresence mode='wait'>
				{show && (
					<View
						img={img}
						close={() => setShow(false)}
					/>
				)}
			</AnimatePresence>
		</>
	)
}

export default ImageView
