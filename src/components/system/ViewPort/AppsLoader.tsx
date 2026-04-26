import { Suspense, memo, useMemo } from "react"
import type { ProcessId } from "@/contexts/process/types"
import { useDynamicWindowsContext } from "@/contexts/process/useProcessContext"
import Loading from "@/components/system/Loading/Loading"
import WindowContainer from "@/components/system/Window/WindowContainer"

const AppsLoader = () => {
  console.log("AppsLoader render")
  const windows = useDynamicWindowsContext()

  const windowEntries = useMemo(() => Object.entries(windows), [windows])

  return (
    <>
      {windowEntries.map(([id, window]) => {
        const { Component, opened } = window

        const SafeComponent = (
          <Suspense fallback={<Loading />}>
            <Component />
          </Suspense>
        )

        return (
          opened && (
            <WindowContainer
              resizable={windows[id as ProcessId[number]].resizable}
              id={id as ProcessId[number]}
              key={id}
            >
              {SafeComponent}
            </WindowContainer>
          )
        )
      })}
    </>
  )
}

const AppsLoaderMemo = memo(AppsLoader)

export default AppsLoaderMemo
