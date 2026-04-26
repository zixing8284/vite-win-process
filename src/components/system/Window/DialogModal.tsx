import React, { useEffect, useRef } from "react"
import { Window, WindowHeader, Button, WindowContent } from "react95"
import styled from "styled-components"
import DialogError from "@/assets/icons/dialog-error.png"
import DialogInfo from "@/assets/icons/dialog-info.png"
import DialogQuestion from "@/assets/icons/dialog-question.png"
import DialogWarning from "@/assets/icons/dialog-warning.png"

interface DialogProps {
  children: React.ReactNode
  type: "error" | "info" | "question" | "warning"
  onClose: () => void
}

const UIDialogModal: React.FC<DialogProps> = ({ onClose, type, children }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    const currentRef = dialogRef.current

    // Prevent closing dialog when pressing escape
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    if (currentRef) {
      currentRef.addEventListener("keydown", handleKeyDown)
    }

    if (currentRef) {
      currentRef.showModal()
    }
    return () => {
      if (currentRef) {
        currentRef.close()
      }
    }
  }, [dialogRef])

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close()
    }
    onClose()
  }

  return (
    <>
      <ReDialog ref={dialogRef}>
        <ReWindow>
          <ReWindowHeader>
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            <Button onClick={handleClose} disabled>
              <span className="icon close" />
            </Button>
          </ReWindowHeader>
          <WindowContent>
            <MessageBox>
              <Icon src={alertIcon[type]} alt="icon" />
              <MessageText>{children}</MessageText>
            </MessageBox>

            <ConfirmBox>
              <Button onClick={handleClose}>OK</Button>
            </ConfirmBox>
          </WindowContent>
        </ReWindow>
      </ReDialog>
    </>
  )
}

const ReDialog = styled.dialog`
  &[open] {
    background-color: transparent;
    border: none;
    ::backdrop {
      background-color: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(1px);
    }
  }
`

const ReWindowHeader = styled(WindowHeader)`
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
  }
  button[disabled] > span.icon::before,
  button[disabled] > span.icon::after {
    background: ${({ theme }) => `${theme.materialTextDisabled}`};
    -webkit-text-fill-color: ${({ theme }) => `${theme.materialTextDisabled}`};
    text-shadow: ${({ theme }) => `${theme.materialTextDisabled}`};
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

const alertIcon = {
  error: DialogError,
  info: DialogInfo,
  question: DialogQuestion,
  warning: DialogWarning,
}

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

const ReWindow = styled(Window)`
  width: 400px;
  height: auto;
`

export default UIDialogModal
