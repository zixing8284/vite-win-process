import { useCallback, useMemo, useState } from "react"
import type { ViewportValue } from "./types"

const useViewportContextState = () => {
  const [viewportValue, setViewportValue] = useState<ViewportValue>({
    showLockScreen: false,
    showCalendar: false,
    showManual: false,
  })

  const updateViewportValue = useCallback(
    (key: keyof ViewportValue, value: ViewportValue[keyof ViewportValue]) => {
      setViewportValue((prev) => ({ ...prev, [key]: value }))
    }, [])

  return useMemo(
    () => ({ viewportValue, updateViewportValue }),
    [viewportValue, updateViewportValue],
  )
}

export default useViewportContextState
