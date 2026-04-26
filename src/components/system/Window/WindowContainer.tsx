import ProcessWindow from "./ProcessWindow/ProcessWindow"
import type { ProcessId } from "@/contexts/process/types"

type WindowContainerProps = {
  resizable: boolean
  children?: React.ReactNode
  id: ProcessId[number]
}

const WindowContainer = ({ resizable, children, id }: WindowContainerProps) => {
  return (
    <>
      <ProcessWindow id={id} resizable={resizable}>
        {children}
      </ProcessWindow>
    </>
  )
}
export default WindowContainer
