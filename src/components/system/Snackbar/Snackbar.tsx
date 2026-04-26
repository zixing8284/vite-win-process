import React, { useEffect, useState } from "react"
import styled from "styled-components"

type SnackbarProps = {
  open?: boolean
  onDismiss?: () => void
  autoHideDuration?: number
  children: React.ReactNode
}

const Snackbar = ({ children, autoHideDuration, onDismiss }: SnackbarProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isSuicide, setIsSuicide] = useState(false)

  const handleTransitionEnd = () => {
    if (!isVisible) {
      setIsSuicide(true)
      onDismiss && onDismiss()
    }
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, autoHideDuration || 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [autoHideDuration])

  return isSuicide ? null : (
    <Wrapper isVisible={isVisible} onTransitionEnd={handleTransitionEnd}>
      <Container>
        <Content>
          {children}
          <CloseButton onClick={handleClose}>×</CloseButton>
        </Content>
      </Container>
    </Wrapper>
  )
}

export default Snackbar

const Wrapper = styled.div<{ isVisible: boolean }>`
  position: absolute;
  left: 50%;
  top: 2rem;
  width: 15rem;
  transform: ${({ isVisible }) =>
    isVisible ? "translateX(-50%)" : "translateX(-50%) scale(0)"};
  transition: transform 0.3s ease-in-out;
  z-index: 9999;
`

const Container = styled.div`
  padding: 0.9rem;
  background-color: ${({ theme }) => theme.tooltip};
  color: ${({ theme }) => theme.materialText};
  border-radius: 4px;
  border: 1px solid #000;
  &:after {
    content: "";
    position: absolute;
    top: 4px;
    left: 4px;
    overflow: hidden;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAJElEQVQoU2NkYGD4z4AKGJG5IA4dFKA5AdVKFAdBVaK4iXIFAEiuCAWq9MdHAAAAAElFTkSuQmCC");
    background-size: 2px 2px;
    background-repeat: repeat;
    z-index: -1;
  }
`

const Content = styled.div`
  margin-left: 0.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const CloseButton = styled.button`
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  float: right;
`
