import { useState, useEffect, useCallback } from 'react'
const useMatchMedia = (media: string) => {
	const getMatches = (query: string): boolean => {
		if (typeof window !== 'undefined') {
			return window.matchMedia(query).matches
		}
		return false
	}
	const [match, setMatch] = useState<boolean>(
		getMatches(media)
	)

	const handleChange = useCallback(() => {
		setMatch(getMatches(media))
	}, [media])

	useEffect(() => {
		const matchMedia = window.matchMedia(media)

		handleChange()

		matchMedia.addEventListener('change', handleChange)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [media])

	return match
}

export default useMatchMedia
