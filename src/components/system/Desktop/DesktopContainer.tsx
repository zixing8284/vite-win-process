import styled from "styled-components"
import React, { ReactNode } from "react"

import { useSystemContext } from "@/contexts/system"
import type { SystemValue } from "@/contexts/system/types"
import {
  DESKTOP_CONTAINER_CLASSNAME,
  DESKTOP_ZINDEX,
} from "@/contexts/constants"

type DesktopProps = Pick<
  SystemValue,
  | "backgroundImage"
  | "backgroundColor"
  | "backgroundRepeat"
  | "backgroundSize"
  | "backgroundPosition"
>

export const Desktop = styled.main.attrs({
  id: "background",
  className: DESKTOP_CONTAINER_CLASSNAME,
})<DesktopProps>`
  z-index: ${DESKTOP_ZINDEX};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: ${(props) => props.backgroundColor};
  background-image: ${(props) => props.backgroundImage};
  background-repeat: ${(props) => props.backgroundRepeat};
  background-size: ${(props) => props.backgroundSize};
  background-attachment: fixed;
  background-position: ${(props) => props.backgroundPosition};
`

const DesktopContainer = ({ children }: { children: ReactNode }) => {
  const { systemValue } = useSystemContext()

  const showStyle: React.CSSProperties = {
    position: "absolute",
    width: "100%",
    height: "100%",
  }

  return (
    <Desktop
      backgroundImage={systemValue.backgroundImage}
      backgroundColor={systemValue.backgroundColor}
      backgroundRepeat={systemValue.backgroundRepeat}
      backgroundSize={systemValue.backgroundSize}
      backgroundPosition={systemValue.backgroundPosition}
    >
      <div style={showStyle}>{children}</div>
    </Desktop>
  )
}

export default DesktopContainer
