import { useCallback, useMemo, useReducer, useState } from "react"
import { dynamicWindows as initialWindows, staticWindows } from "./process"
import {
  DynamicWindowsContext,
  StaticWindowsContext,
  WindowsDispatchContext,
  windowsReducer,
} from "./context"

const WindowsProvider = ({ children }: { children: React.ReactNode }) => {
  const [dynamicWindows, dispatch] = useReducer(windowsReducer, initialWindows)

  const [defaultWindows, setDefaultWindows] = useState(staticWindows)

  const updateDefaultWindows = useCallback(
    (newWindows: typeof staticWindows) => {
      setDefaultWindows((prev) => ({ ...prev, ...newWindows }))
    },
    [],
  )

  const staticWindowsContextValue = useMemo(
    () => ({
      defaultWindows,
      updateDefaultWindows,
    }),
    [defaultWindows, updateDefaultWindows],
  )

  return (
    <StaticWindowsContext.Provider value={staticWindowsContextValue}>
      <DynamicWindowsContext.Provider value={dynamicWindows}>
        <WindowsDispatchContext.Provider value={dispatch}>
          {children}
        </WindowsDispatchContext.Provider>
      </DynamicWindowsContext.Provider>
    </StaticWindowsContext.Provider>
  )
}

export default WindowsProvider
