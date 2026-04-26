import React, { useState } from "react"
import styled, { css } from "styled-components"

import { Button, Window, WindowContent, WindowHeader } from "react95"
import { DIALOG_WINDOW_ZINDEX, TASKBAR_HEIGHT } from "@/contexts/constants"
import DialogError from "@/assets/icons/dialog-error.png"
import DialogInfo from "@/assets/icons/dialog-info.png"
import DialogQuestion from "@/assets/icons/dialog-question.png"
import DialogWarning from "@/assets/icons/dialog-warning.png"

interface DialogWindowProps {
  type: "error" | "info" | "question" | "warning"
  size: "small" | "medium" | "large"
  children: React.ReactNode
  onClose?: () => void
}

const alertIcon = {
  error: DialogError,
  info: DialogInfo,
  question: DialogQuestion,
  warning: DialogWarning,
}

const windowWidths = {
  constrainedViewport: {
    small: "min(100%, 360px)",
    medium: "min(100%, 390px)",
    large: "100%",
  },
  unconstrainedViewport: {
    small: "min(100%, 500px)",
    medium: "min(100%, 700px)",
    large: "min(100%, 1000px)",
  },
}

const DialogWindow = ({
  onClose,
  type,
  children,
  size = "small",
}: DialogWindowProps) => {
  console.log("DialogWindow")
  const [close, setClose] = useState(false)

  const handleClose = () => {
    setClose(true)

    if (onClose) onClose()
  }

  return (
    <>
      {!close && (
        <WindowWrapper>
          <WindowStyled size={size}>
            <WindowHeaderStyled>
              <span>{type}</span>
              <Button onClick={handleClose} disabled>
                <span className="icon close" />
              </Button>
            </WindowHeaderStyled>
            <WindowContent>
              <MessageBox>
                <Icon src={alertIcon[type]} alt="icon" />
                <MessageText>{children}</MessageText>
              </MessageBox>
              <ConfirmBox>
                <Button onClick={handleClose} primary>
                  OK
                </Button>
              </ConfirmBox>
            </WindowContent>
          </WindowStyled>
        </WindowWrapper>
      )}
    </>
  )
}

const WindowWrapper = styled.div`
  --taskbar-height: ${TASKBAR_HEIGHT};
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  z-index: ${DIALOG_WINDOW_ZINDEX};
  padding-block-end: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const WindowStyled = styled(Window)<{
  size: "small" | "medium" | "large"
}>`
  position: relative;
  z-index: 1;
  ${({ size }) => css`
    @media (max-width: 767px) {
      width: ${windowWidths.constrainedViewport[size]};
    }
    @media (min-width: 768px) {
      width: ${windowWidths.unconstrainedViewport[size]};
    }
    @media (min-height: 768px) {
      max-height: calc(100vh - var(--taskbar-height));
    }
  `}
`

const WindowHeaderStyled = styled(WindowHeader)`
  display: flex;
  align-items: center;
  > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
    min-width: 0;
    user-select: none;
  }
  button {
    margin-left: 0.25rem;

    &[disabled] > span.icon::before,
    &[disabled] > span.icon::after {
      background: ${({ theme }) => `${theme.materialTextDisabled}`};
      -webkit-text-fill-color: ${({ theme }) =>
        `${theme.materialTextDisabled}`};
      text-shadow: ${({ theme }) => `${theme.materialTextDisabled}`};
    }
  }
  button > span.icon {
    user-select: none;
    width: 16px;
    height: 16px;
    display: inline-block;
    position: relative;
    margin-left: -1px;
    margin-top: -1px;
    &:before,
    &:after {
      content: "";
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
  }
  span.close {
    transform: rotate(45deg);
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`

const MessageBox = styled.div`
  display: flex;
  flex-direction: row;
`

const MessageText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ConfirmBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  & > button {
    margin: 0 5px;
    min-width: 70px;
  }
`

const Icon = styled.img`
  /* filter: grayscale(1); */
  image-rendering: pixelated;
  padding: 7px 15px 7px 7px;
`

export default DialogWindow
