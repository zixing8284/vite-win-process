import styled from "styled-components"
import { Frame } from "react95"

import { useViewportContext } from "@/contexts/viewport"
import StatusClock from "./StatusClock"
import InfoHelper from "./Infohelper"
import Volume from "./Volume"

const TaskBarStatusContainer = styled(Frame).attrs({ variant: "well" })`
  display: flex;
  margin-inline-start: auto;
  align-items: center;
  padding: 4px;
  margin: 2px;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  user-select: none;
  image-rendering: pixelated;
  gap: 4px;
  filter: saturate(0.7);
`

const TaskBarStatus = () => {
  const { viewportValue, updateViewportValue } = useViewportContext()

  return (
    <TaskBarStatusContainer>
      <div
        onClick={() =>
          updateViewportValue("showManual", !viewportValue.showManual)
        }
      >
        <InfoHelper />
      </div>
      <Volume />
      <div
        onClick={() =>
          updateViewportValue("showCalendar", !viewportValue.showCalendar)
        }
      >
        <StatusClock />
      </div>
    </TaskBarStatusContainer>
  )
}

export default TaskBarStatus
