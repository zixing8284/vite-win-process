import React, { useCallback, useRef, useState } from "react"

import type { ProcessId } from "@/contexts/process/types"
import {
  useDynamicWindowsContext,
  useWindowsDispatch,
} from "@/contexts/process/useProcessContext"
import { DESKTOP_CONTAINER_CLASSNAME } from "@/contexts/constants"

import useInteract from "./useInteract"
import {
  WindowHeaderStyled,
  WindowStyled,
  HeaderTitle,
  HeaderButtonWrapper,
  CloseIcon,
  MaximizeIcon,
  MinimizeIcon,
  RestoreIcon,
  HeaderButtonArea,
} from "../CommonStyle"

interface ProcessWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  id: ProcessId[number]
  resizable: boolean
  children: React.ReactNode
  windowClose?: () => void
}

const ProcessWindow = ({
  id,
  children,
  resizable,
  windowClose,
}: ProcessWindowProps) => {
  const windows = useDynamicWindowsContext()
  const dispatch = useWindowsDispatch()

  const processWindow = windows[id]
  const { zIndex, title, focused, minimized, defaultSize } = processWindow
  const originStyle = {
    zIndex,
    display: minimized ? "none" : "flex",
    width: defaultSize.width || "auto",
    height: defaultSize.height || "auto",
    maxWidth: "100vw",
    top: defaultSize.top,
    left: defaultSize.left,
  }

  const windowRef = useRef<HTMLDivElement | null>(null)

  const [isDraggingOrResizing, setIsDraggingOrResizing] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)

  const [prevCssText, setPrevCssText] = useState("")

  const onDragStart = useCallback(() => {
    setIsDraggingOrResizing(true)
  }, [])

  const onDragEnd = useCallback(() => {
    setIsDraggingOrResizing(false)
  }, [])

  const onResizeStart = useCallback(() => {
    setIsDraggingOrResizing(true)
  }, [])

  const onResizeEnd = useCallback(() => {
    setIsDraggingOrResizing(false)
  }, [])

  const {
    ref: interact,
    style: interactStyle,
    dragAllowFromRef,
    setVector: setInteractVector,
    enable: interactEnable,
    disable: interactDisable,
  } = useInteract({
    resizable: resizable,
    restriction: `.${DESKTOP_CONTAINER_CLASSNAME}`,
    restrictSize: {
      width: defaultSize.resizeMinWidth,
      height: defaultSize.resizeMinHeight,
    },
    defaultSize: {
      width: defaultSize.width,
      height: defaultSize.height,
    },
    dragIgnoreFrom: ".drag-ignore-from",
    onDragStart,
    onDragEnd,
    onResizeStart,
    onResizeEnd,
  })

  const targetRefHandler = (el: HTMLDivElement) => {
    if (el) {
      windowRef.current = el
      interact.current = el
    }
  }

  const handleMaximize = (event: React.MouseEvent) => {
    event.stopPropagation()
    interactDisable()
    setIsMaximized(true)

    // Save previous css
    const cssText = windowRef.current?.style.cssText
    if (cssText) setPrevCssText(cssText)
    // Apply new css
    if (windowRef.current) {
      windowRef.current.style.cssText += `
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: none;
      `
    }
    dispatch({
      type: "MAXIMIZE_WINDOW",
      payload: {
        id,
      },
    })
  }

  const handleRestoreMaximize = (event: React.MouseEvent) => {
    event.stopPropagation()
    interactEnable()
    setIsMaximized(false)

    // Restore previous css
    if (windowRef.current) {
      windowRef.current.style.cssText = prevCssText
    }

    dispatch({
      type: "RESTORE_FROM_MAXIMIZE_WINDOW",
      payload: {
        id,
      },
    })
  }

  const handleMinimize = (event: React.MouseEvent) => {
    event.stopPropagation()
    dispatch({
      type: "MINIMIZE_WINDOW",
      payload: {
        id,
      },
    })
  }

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()

    dispatch({
      type: "CLOSE_WINDOW",
      payload: {
        id,
      },
    })

    if (windowClose) {
      windowClose()
    }
  }

  const handleWindowMouseDown = useCallback(
    (event: React.MouseEvent) => {
      console.log("handleWindowMouseDown in InteractWindow")
      event.stopPropagation()

      dispatch({
        type: "FOCUS_WINDOW",
        payload: {
          id,
        },
      })
    },
    [dispatch, id],
  )

  const handleLeftHalf = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsMaximized(false)
    interactEnable()

    setInteractVector(() => ({
      ...{
        vx: 0,
        vy: 0,
      },
    }))
    if (windowRef.current) {
      windowRef.current.style.cssText += `
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
      `
    }
  }

  const handleRightHalf = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsMaximized(false)
    interactEnable()

    setInteractVector(() => ({
      vx: 0,
      vy: 0,
    }))

    if (windowRef.current) {
      windowRef.current.style.cssText += `
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
      `
    }
  }

  return (
    <WindowStyled
      resizable={resizable}
      ref={targetRefHandler}
      isDraggingOrResizing={isDraggingOrResizing}
      isMaximized={isMaximized}
      style={{
        ...originStyle,
        ...interactStyle,
      }}
      onMouseDown={handleWindowMouseDown}
    >
      <WindowHeaderStyled ref={dragAllowFromRef} active={focused}>
        <HeaderTitle
          onDoubleClick={isMaximized ? handleRestoreMaximize : handleMaximize}
        >
          {title}
        </HeaderTitle>
        <HeaderButtonArea className="drag-ignore-from">
          <HeaderButtonWrapper onClick={handleLeftHalf}>
            {"L"}
          </HeaderButtonWrapper>
          <HeaderButtonWrapper onClick={handleRightHalf}>
            {"R"}
          </HeaderButtonWrapper>
          <HeaderButtonWrapper onClick={handleMinimize}>
            <MinimizeIcon />
          </HeaderButtonWrapper>
          {isMaximized ? (
            <HeaderButtonWrapper onClick={handleRestoreMaximize}>
              <RestoreIcon />
            </HeaderButtonWrapper>
          ) : (
            <HeaderButtonWrapper onClick={handleMaximize}>
              <MaximizeIcon />
            </HeaderButtonWrapper>
          )}
          <HeaderButtonWrapper onClick={handleRemove}>
            <CloseIcon />
          </HeaderButtonWrapper>
        </HeaderButtonArea>
      </WindowHeaderStyled>
      {children}
    </WindowStyled>
  )
}

export default ProcessWindow
