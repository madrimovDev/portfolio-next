import { DefaultButtonProps } from "./button.types"

const makeColorScheme = (color: DefaultButtonProps['colorScheme']): string => {
  switch (color) {
    case 'blue': {
      return 'dark:bg-sky-600 transition-all hover:bg-sky-500 dark:hover:bg-sky-700 bg-sky-400 shadow-sky-400/40'
    }
    case 'red': {
      return 'dark:bg-red-600 transition-all hover:bg-red-500 dark:hover:bg-red-700 bg-red-400 shadow-red-400/40'
    }
    case 'green': {
      return 'dark:bg-green-600 transition-all hover:bg-green-500 dark:hover:bg-green-700 bg-green-400 shadow-green-400/40'
    }
    case 'ghost': {
      return 'dark:bg-gray-600/50 bg-gray-300/50 text-black dark:text-gray-200 shadow-none'
    }
    default: return 'shadow-none'
  }
}

export default makeColorScheme