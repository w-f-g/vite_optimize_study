import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react'

export enum ThemeType {
  LIGHT = "light",
  DARK = "dark",
}

type ThemeProviderProps = {
  children: (updateTheme: Dispatch<SetStateAction<ThemeType>>) => ReactNode
}

export const ThemeContext = createContext<ThemeType>(ThemeType.LIGHT)

export default function ThemeProvider({children}: ThemeProviderProps) {
  const [theme, updateTheme] = useState(ThemeType.LIGHT)
  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])
  return (
    <ThemeContext.Provider value={theme}>
      {children(updateTheme)}
    </ThemeContext.Provider>
  )
}
