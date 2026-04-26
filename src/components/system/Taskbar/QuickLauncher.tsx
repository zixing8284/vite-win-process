import { Tooltip } from "react95"

import { useViewportContext } from "@/contexts/viewport"
import { ButtonStyled, ButtonIcon } from "./CommonStyle"

import Lock from "@/assets/icons/lock.png"

import styled from "styled-components"

export const LauncherContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const DesktopIcon = () => {
  const { updateViewportValue } = useViewportContext()

  const handleShowLockScreen = () => {
    updateViewportValue("showLockScreen", true)
  }

  return (
    <ButtonStyled onClick={handleShowLockScreen}>
      <span role="img" aria-label="lockon">
        <ButtonIcon src={Lock} alt="lock screen" />
      </span>
    </ButtonStyled>
  )
}

const QuickLauncher = ({ children }: { children: React.ReactNode }) => {
  return (
    <LauncherContainer>
      <Tooltip
        text="LockScreen"
        enterDelay={300}
        leaveDelay={0}
        position="right"
      >
        <DesktopIcon />
      </Tooltip>
      {children}
    </LauncherContainer>
  )
}

export default QuickLauncher
