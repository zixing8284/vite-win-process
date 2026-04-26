import { ThemeProvider } from "styled-components"

import { useSystemContext } from "@/contexts/system"

interface ThemeProviderWrapperProps {
  children: React.ReactNode
}

const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  const { systemValue } = useSystemContext()

  // ThemeProvider theme value can be used by all styled components(styeled.div, styled.button, etc.) as a theme prop
  return (
    <ThemeProvider
      theme={() => ({
        ...systemValue.theme,
      })}
    >
      {children}
    </ThemeProvider>
  )
}

export default ThemeProviderWrapper
