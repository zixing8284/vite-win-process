import { ReactNode } from "react"
import styled, { css } from "styled-components"

import type { SystemValue } from "@/contexts/system/types"
import { useSystemContext } from "@/contexts/system"
import { useViewportContext } from "@/contexts/viewport"

import DesktopContainer, { Desktop } from "../Desktop/DesktopContainer"
import Taskbar from "../Taskbar/Taskbar"
import PortComponent from "./PortComp/PortComp"
import AppsLoader from "./AppsLoader"
import AppEntries from "../Taskbar/AppEntries"

const ViewPort = () => {
  console.log("ViewPort render")

  const { viewportValue } = useViewportContext()
  const { showCalendar, showLockScreen, showManual } = viewportValue

  return (
    <>
      <ViewPortContainer>
        {showLockScreen && <PortComponent showComp="LOCKSCREEN" />}
        <TaskbarAutoHideOutLine />
        <DesktopContainer>
          <AppsLoader />
          {showCalendar && <PortComponent showComp="TIMEDATE" />}
          {showManual && <PortComponent showComp="MANUAL" />}
        </DesktopContainer>
        <TaskbarContainer>
          <Taskbar>
            <AppEntries />
          </Taskbar>
        </TaskbarContainer>
      </ViewPortContainer>
    </>
  )
}

const TaskbarAutoHideOutLine = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.material};
`

const TaskbarContainer = styled.div`
  width: 100%;
  height: 100%;
  &:hover {
    display: flex !important;
  }
  ${() =>
    css`
      ${TaskbarAutoHideOutLine}:hover ~ && {
        display: flex;
      }
    `}
`

const ViewPortContainer = ({ children }: { children: ReactNode }) => {
  console.log("ViewPortContainer render")
  const { taskbarPosition, autoHideTaskbar } = useSystemContext().systemValue

  return (
    <ViewPortMain
      taskbarPosition={taskbarPosition}
      autoHideTaskbar={autoHideTaskbar}
    >
      {children}
    </ViewPortMain>
  )
}

const ViewPortMain = styled.div<{
  taskbarPosition: SystemValue["taskbarPosition"]
  autoHideTaskbar: SystemValue["autoHideTaskbar"]
}>`
  display: grid;
  height: 100vh;
  overflow: hidden;

  ${({ taskbarPosition }) => createTaskbarPosition(taskbarPosition)}
  ${({ autoHideTaskbar }) => createTaskbarHide(autoHideTaskbar)}
`

const createTaskbarPosition = (taskbarPosition: "top" | "bottom") => {
  const isTaskbarTop = taskbarPosition === "top"
  return css`
    grid-template-rows: ${isTaskbarTop ? "auto auto 1fr" : "1fr auto auto"};
    ${TaskbarAutoHideOutLine} {
      grid-row-start: ${isTaskbarTop ? 1 : 3};
      grid-row-end: ${isTaskbarTop ? 2 : 4};
    }
    ${TaskbarContainer} {
      grid-row-start: 2;
      grid-row-end: 3;
    }
    ${Desktop} {
      grid-row-start: ${isTaskbarTop ? 3 : 1};
      grid-row-end: ${isTaskbarTop ? 4 : 2};
    }
  `
}

const createTaskbarHide = (autoHideTaskbar: boolean) => {
  return css`
    ${TaskbarContainer} {
      display: ${autoHideTaskbar ? "none" : "flex"};
    }
    ${TaskbarAutoHideOutLine} {
      display: ${autoHideTaskbar ? "block" : "none"};
    }
  `
}

export default ViewPort
