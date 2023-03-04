import { useState } from "react"

const useMenu = () => {
  const [show, setShow] = useState<boolean>(false)

  const closeMenu = () => setShow(false)
  const openMenu = () => setShow(true)
  const toggleMenu = () => setShow(prev => !prev)

  return {
    show, closeMenu, openMenu, toggleMenu
  }
}

export default useMenu