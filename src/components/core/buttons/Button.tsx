import { ElementType } from 'react'
import makeColorScheme from './makeColorScheme'
import { ButtonType } from './button.types'

const defaultElement = 'button'

const Button = <
	E extends ElementType = typeof defaultElement
>({
	as,
	children,
	className,
	colorScheme,
	variant,
	...otherProps
}: ButtonType<E>) => {
	const Component = as || defaultElement
	const color = makeColorScheme(colorScheme)
	const padding = variant
		? 'py-2 px-5 text-sm font-bold'
		: 'py-2 px-2'
	return (
		<Component
			className={`${
				className ? className : ''
			}${padding} inline-flex justify-center items-center gap-2 text-white/80 ${color} rounded-md shadow-lg `}
			{...otherProps}
		>
			{children}
		</Component>
	)
}

export default Button
