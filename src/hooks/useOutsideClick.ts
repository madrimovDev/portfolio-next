import { RefObject, useEffect } from 'react'

const useOutsideClick = (
	ref: RefObject<HTMLElement>,
	handle: () => void
) => {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			if (
				!ref ||
				!ref.current?.contains(event.target as Node)
			) {
				handle()
			}
		}

		if (typeof window !== 'undefined') {
			window.addEventListener('mousedown', listener)
			window.addEventListener('touchstart', listener)
		}

		return () => {
			window.removeEventListener('mousedown', listener)
			window.removeEventListener('touchstart', listener)
		}
	}, [handle, ref])
}

export default useOutsideClick