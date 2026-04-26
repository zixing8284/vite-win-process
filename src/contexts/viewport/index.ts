import contextFactory from "../contextFactory"
import useViewportContextState from "./useViewportContextState"

const { Provider, useContext } = contextFactory(useViewportContextState)

export { Provider as ViewportContextProvider, useContext as useViewportContext }
