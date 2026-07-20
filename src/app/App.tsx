import { ReactNode } from "react"
import ViewPort from "@/components/system/ViewPort/ViewPort"
import { SystemContextProvider } from "@/contexts/system"
import { ViewportContextProvider } from "@/contexts/viewport"
import WindowsProvider from "@/contexts/process/WindowsProvider"
import GlobalStyle from "@/app/wrappers/GlobalStyle"
import ThemeProviderWrapper from "./wrappers/ThemeProviderWrapper"
import "./App.css"

// const App = () => {
//   console.log("App render")
//   return (
//     <SystemContextProvider>
//       <WindowsProvider>
//         <ThemeProviderWrapper>
//           <ViewportContextProvider>
//             <GlobalStyle />
//             <ViewPort />
//           </ViewportContextProvider>
//         </ThemeProviderWrapper>
//       </WindowsProvider>
//     </SystemContextProvider>
//   )
// }

type Provider = React.ComponentType<{ children: ReactNode }>

function composeProviders(...providers: Provider[]): Provider {
  return ({ children }) =>
    providers.reduceRight(
      (acc, Provider) => <Provider>{acc}</Provider>,
      children,
    )
}

const CombinedProviders: Provider = composeProviders(
  SystemContextProvider,
  WindowsProvider,
  ThemeProviderWrapper,
  ViewportContextProvider,
)

const App = () => {
  console.log("App render")
  return (
    <CombinedProviders>
      <GlobalStyle />
      <ViewPort />
    </CombinedProviders>
  )
}

export default App
