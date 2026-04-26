import contextFactory from "../contextFactory"
import useSystemContextState from "./useSystemContextState"

const { Provider, useContext } = contextFactory(useSystemContextState)

export { Provider as SystemContextProvider, useContext as useSystemContext }
