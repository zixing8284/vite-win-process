import React, { CSSProperties, useCallback, useState } from "react"

import useOutsideClick from "@/hooks/useOutsideClick"
import useInteract from "./ProcessWindow/useInteract"
import {
  DESKTOP_CONTAINER_CLASSNAME,
  NORMAL_WINDOW_ACTIVE_ZINDEX,
  NORMAL_WINDOW_INACTIVE_ZINDEX,
} from "@/contexts/constants"
import {
  CloseIcon,
  HeaderButtonArea,
  HeaderButtonWrapper,
  HeaderTitle,
  WindowHeaderStyled,
  WindowStyled,
} from "./CommonStyle"

type NormalWindowProps = {
  children: React.ReactNode
  title: string
  draggable?: boolean
  defaultSize?: {
    width?: CSSProperties["width"]
    height?: CSSProperties["height"]
    top?: CSSProperties["top"]
    left?: CSSProperties["left"]
  }
  windowClose?: () => void
}

const NormalWindow = ({
  children,
  title,
  draggable,
  defaultSize = {
    width: "480px",
    height: "480px",
    top: "50%",
    left: "50%",
  },
  windowClose,
}: NormalWindowProps) => {
  const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false)

  const windowRef = useOutsideClick(() => {
    setActive(false)
  })

  const [active, setActive] = useState(true)

  const onDragStart = useCallback(() => {
    setIsDraggingOrResizing(true)
  }, [])

  const onDragEnd = useCallback(() => {
    setIsDraggingOrResizing(false)
  }, [])

  const handleWindowMouseDown = useCallback(() => {
    setActive(true)
  }, [])

  const {
    ref: interact,
    style: interactStyle,
    dragAllowFromRef,
  } = useInteract({
    resizable: false,
    draggable: draggable,
    restriction: `.${DESKTOP_CONTAINER_CLASSNAME}`,
    defaultSize: {
      width: defaultSize.width,
      height: defaultSize.height,
    },
    dragIgnoreFrom: ".drag-ignore-from",
    onDragStart,
    onDragEnd,
  })

  const targetRefHandler = (el: HTMLDivElement) => {
    if (el) {
      windowRef.current = el
      interact.current = el
    }
  }

  const handleRemove = useCallback(() => {
    if (windowClose) {
      windowClose()
    }
  }, [windowClose])

  return (
    <WindowStyled
      resizable={false}
      ref={targetRefHandler}
      isDraggingOrResizing={isDraggingOrResizing}
      style={{
        ...defaultSize,
        ...interactStyle,
        zIndex: active
          ? NORMAL_WINDOW_ACTIVE_ZINDEX
          : NORMAL_WINDOW_INACTIVE_ZINDEX,
      }}
      onMouseDown={handleWindowMouseDown}
    >
      <WindowHeaderStyled ref={dragAllowFromRef} active={active}>
        <HeaderTitle>{title}</HeaderTitle>
        <HeaderButtonArea className="drag-ignore-from">
          <HeaderButtonWrapper onClick={handleRemove}>
            <CloseIcon />
          </HeaderButtonWrapper>
        </HeaderButtonArea>
      </WindowHeaderStyled>
      {children}
    </WindowStyled>
  )
}

export default NormalWindow
