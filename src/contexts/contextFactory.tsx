import { FC, ReactNode, createContext, memo, useContext } from "react"

const contextFactory = <T,>(
  useContextState: () => T,
  ContextComponent?: ReactNode,
): {
  Provider: FC<{ children: ReactNode }>
  useContext: () => T
} => {
  const Context = createContext<T>({} as T)

  return {
    Provider: memo(({ children }) => (
      <Context.Provider value={useContextState()}>
        {children}
        {ContextComponent}
      </Context.Provider>
    )),
    useContext: () => useContext(Context),
  }
}

export default contextFactory
