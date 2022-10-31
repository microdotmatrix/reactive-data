import { useEffect } from 'react'
import { useStorage } from '_u/localStore'

export function useDarkMode() {
  const [colorSchema, setColorSchema] = useStorage('color-schema', 'auto')
  const isDark = colorSchema === 'dark'
  const toggleDark = () => setColorSchema(isDark ? 'light' : 'dark')

  if (typeof document !== 'undefined') {
    useEffect(() => {
      document.documentElement.classList.toggle('dark', isDark)
    })
  }

  return [isDark, toggleDark]
}