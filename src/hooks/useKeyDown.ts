import { useEffect } from 'react';
const useKeyDown = (key: KeyboardEvent['code'], handle: () => void) => {
  
  const listener = (event: KeyboardEvent) => {
    if (typeof window !== 'undefined') {
      if (key) {
        if (event.code === key) {
          handle()
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', listener)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return () => {
    window.removeEventListener('keydown', listener)
  }
}

export default useKeyDown