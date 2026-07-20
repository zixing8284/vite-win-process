import { useMemo } from "react"

import type { ProcessId } from "@/contexts/process/types"
import { useSystemContext } from "@/contexts/system"
import { useStaticWindowsContext } from "@/contexts/process/useProcessContext"
import QuickLauncher from "./QuickLauncher"
import AppEntryMemo from "./AppEntry"
import { Handle } from "react95"

const AppEntries = () => {
  console.log("AppEntries render")
  const windows = useStaticWindowsContext().defaultWindows

  const { systemValue } = useSystemContext()
  const { taskbarPosition } = systemValue

  const windowEntries = useMemo(() => Object.entries(windows), [windows])

  const renderAppEntryListByType = useMemo(
    () => (type: "feature" | "origin") => {
      return windowEntries.map(([id, { title, Icon, type: windowType }]) => {
        if (windowType === type) {
          return (
            <AppEntryMemo
              key={id}
              title={title}
              Icon={Icon}
              id={id as ProcessId[number]}
              taskbarPosition={taskbarPosition}
              type={type}
            />
          )
        }
      })
    },
    [taskbarPosition, windowEntries],
  )

  return (
    <>
      <QuickLauncher>{renderAppEntryListByType("origin")}</QuickLauncher>

      <Handle size={35} />
      {renderAppEntryListByType("feature")}
    </>
  )
}

export default AppEntries
