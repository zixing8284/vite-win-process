import { Dispatch, createContext } from "react"
import type { Processes, ProcessId } from "./types"
import {
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  restoreFromMaximizeWindow,
  focusWindow,
  openOriginWindow,
  openFeatureWindow,
  clickFromAppQueue,
} from "./operations"

type Action = { type: string; payload: { id: ProcessId[number] } }
type WindowsDispatch = Dispatch<Action>

interface IContext<T> {
  defaultWindows: T
  updateDefaultWindows: (windows: T) => void
}

export const DynamicWindowsContext = createContext<Processes>({} as Processes)

// export const StaticWindowsContext = createContext<Processes>({} as Processes)
export const StaticWindowsContext = createContext<IContext<Processes>>({
  defaultWindows: {} as Processes,
  updateDefaultWindows: () => undefined,
})

export const WindowsDispatchContext = createContext<WindowsDispatch>(
  {} as WindowsDispatch,
)

export const windowsReducer = (windows: Processes, action: Action) => {
  const { type, payload } = action
  switch (type) {
    case "CLOSE_WINDOW": {
      return closeWindow(windows, payload.id)
    }
    case "MINIMIZE_WINDOW": {
      return minimizeWindow(windows, payload.id)
    }
    case "MAXIMIZE_WINDOW": {
      return maximizeWindow(windows, payload.id)
    }
    case "RESTORE_FROM_MAXIMIZE_WINDOW": {
      return restoreFromMaximizeWindow(windows, payload.id)
    }
    case "FOCUS_WINDOW": {
      return focusWindow(windows, payload.id)
    }
    case "OPEN_ORIGIN_WINDOW": {
      return openOriginWindow(windows, payload.id)
    }
    case "OPEN_FEATURE_WINDOW": {
      return openFeatureWindow(windows, payload.id)
    }
    case "CLICK_FROM_APP_QUEUE": {
      return clickFromAppQueue(windows, payload.id)
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`)
    }
  }
}
