import { useLayoutEffect, useState } from 'react'

// eslint-disable-next-line import/prefer-default-export
export function useMediaQuery(query) {
	const [matches, setMatches] = useState(() => matchMedia(query).matches)

	useLayoutEffect(() => {
		const mediaQuery = matchMedia(query)

		function onMediaQueryChange() {
			setMatches(mediaQuery.matches)
		}

		mediaQuery.addEventListener('change', onMediaQueryChange)

		return () => {
			mediaQuery.removeEventListener('change', onMediaQueryChange)
		}
	}, [query])

  return matches;
}