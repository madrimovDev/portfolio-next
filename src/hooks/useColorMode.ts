import { useEffect, useState } from "react"

const useColorMode = () => {
  const [dark, setDark] = useState<boolean>(false)


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const colorMode = window.localStorage.getItem('color-mode')
      if (colorMode && colorMode === 'dark') {
        window.document.documentElement.className = 'dark'
        setDark(true)        
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.document.documentElement.className = dark ? 'dark' : 'light'
      window.localStorage.setItem('color-mode', dark ? 'dark' : 'light')
    }
  }, [dark])

  const toggleTheme = () => setDark(prev => !prev)

  return {toggleTheme, isDark: dark}
}

export default useColorMode