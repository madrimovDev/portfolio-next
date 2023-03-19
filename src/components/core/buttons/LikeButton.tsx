import classNames from 'classnames'
import React, { useState } from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { motion } from 'framer-motion'

const LikeButton = () => {
	const [liked, setLiked] = useState<boolean>(false)
	const [count, setCount] = useState<number>(99)

	const clickHandler = () => {
		setLiked((prev) => !prev)
		setCount((prev) => (!liked ? count + 1 : count - 1))
	}

	return (
		<span className='flex gap-2 items-center'>
			<motion.button
				animate={{
					scale: liked ? [1, 1.3, 1, 1.3, 1] : 1,
					opacity: liked ? [1, 0.5, 1, 0.5, 1] : 1
				}}
				transition={{
					type: 'spring',
					bounce: 0.7,
					duration: 1
				}}
				className='text-red-500'
				onClick={clickHandler}
			>
				{liked ? <BsHeartFill /> : <BsHeart />}
			</motion.button>
			{count}
		</span>
	)
}

export default LikeButton
