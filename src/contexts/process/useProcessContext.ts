import { useContext } from "react"
import {
  StaticWindowsContext,
  DynamicWindowsContext,
  WindowsDispatchContext,
} from "./context"

export const useStaticWindowsContext = () => {
  return useContext(StaticWindowsContext)
}

export const useDynamicWindowsContext = () => {
  return useContext(DynamicWindowsContext)
}

export const useWindowsDispatch = () => {
  return useContext(WindowsDispatchContext)
}
