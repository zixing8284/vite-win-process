import { useMemo } from "react"
import LockScreen from "@/components/system/LockScreen/LockScreen"
import TimeDate from "./TimeDate"
import Manual from "@/components/features/Manual/Manual"

const SHOWCOMPS = {
  TIMEDATE: TimeDate,
  LOCKSCREEN: LockScreen,
  MANUAL: Manual,
}

const PortComponent = ({ showComp }: { showComp: keyof typeof SHOWCOMPS }) => {
  const CurrentComp = useMemo(() => {
    return SHOWCOMPS[showComp] ?? null
  }, [showComp])

  return <CurrentComp />
}

export default PortComponent
