import { memo } from "react"
import styled from "styled-components"
import { AppBar, Handle, Toolbar } from "react95"

import TaskbarStatus from "./TaskbarStatus/TaskbarStatus"
import RunningQueue from "./RunningQueue"
import { TASKBAR_HEIGHT, TASKBAR_ZINDEX } from "@/contexts/constants"

const AppBarStyled = styled(AppBar)`
  display: flex;
  flex-direction: row;
  position: relative;
  font-size: 0.75em;
  width: 100vw;
  height: calc(${TASKBAR_HEIGHT} + 2px);
  z-index: ${TASKBAR_ZINDEX};
  contain: size layout;
`
const ToolbarStyled = styled(Toolbar)`
  flex-grow: 1;
  padding: 0.4rem;
  display: flex;
  overflow-x: hidden;
`

const RunningQueueArea = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  flex: 1;
`
const LauncherBox = styled.div`
  display: flex;
  place-content: center;
  place-items: center;
`

const Taskbar = ({ children }: { children?: React.ReactNode }) => {
  console.log("TaskBar render")
  return (
    <AppBarStyled>
      <LauncherBox> {children}
        <Handle size={35} />
      </LauncherBox>
      <ToolbarStyled>
        <RunningQueueArea>
          <RunningQueue />
        </RunningQueueArea>
      </ToolbarStyled>
      <TaskbarStatus />
    </AppBarStyled>
  )
}

const TaskbarMemo = memo(Taskbar)

export default TaskbarMemo
