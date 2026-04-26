import styled, { css } from "styled-components"
import {
  Window,
  WindowHeader,
  Frame,
  Button,
  WindowContent,
  ScrollView,
} from "react95"

export const createDisabledTextStyles = () => css`
  -webkit-text-fill-color: ${({ theme }) => theme.materialTextDisabled};
  color: ${({ theme }) => theme.materialTextDisabled};
  text-shadow: 1px 1px ${({ theme }) => theme.materialTextDisabledShadow};
`

export const DisabledText = styled.p`
  ${createDisabledTextStyles()}
`

/**
 * For <p> tag
 */
export const Paragraph = styled.p`
  &:not(:last-child) {
    margin-block-end: 1rem;
  }
`

/**
 * Status footer in <Window> display extra information
 */
export const FrameStyled = styled(Frame)`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  min-height: calc(2em + 2px);
  padding: 0.1rem 0.25rem;
`

interface WindowStyledProps {
  isDraggingOrResizing?: boolean
  isMaximized?: boolean
}

/**
 * For <Window> tag
 * @param isDraggingOrResizing
 * @param isMaximized
 */
export const WindowStyled = styled(Window).attrs<WindowStyledProps>(
  ({ isDraggingOrResizing }) => ({
    className: isDraggingOrResizing ? "target dragging-resizing" : "target",
  }),
)<WindowStyledProps>`
  transform: translate(0, 0);

  &.dragging-resizing {
    background-color: transparent;
    border: none;
    // simulate the style of windows95 when dragging
    outline: 1px dotted #808088;
    box-shadow: inset -4px -4px 0px #808088, inset 4px 4px 0px #808088;

    > * {
      opacity: 0;
      pointer-events: none;
    }
  }

  ${({ isDraggingOrResizing }) =>
    !isDraggingOrResizing &&
    css`
      /* transition-duration: 200ms;
      transition-timing-function: ease-in-out;
      transition-property: transform, width, height, top, left, bottom, right,
        scale; */
    `}

  [data-testid="resizeHandle"] {
    display: ${({ isMaximized }) => (isMaximized ? "none" : "block")};
    bottom: 0.4rem;
    right: 0.4rem;
    width: 1rem;
    height: 1rem;
    cursor: ${({ isMaximized }) => (isMaximized ? "default" : "nwse-resize")};
  }
  box-sizing: border-box;
  max-width: auto;
  max-height: auto;
  position: absolute;
  display: flex;
  flex-direction: column;
  user-select: none;
  overflow: hidden;

  ${FrameStyled} {
    margin-top: auto;
  }
`

export const WindowHeaderStyled = styled(WindowHeader).attrs({
  className: "header",
})`
  display: flex;
  align-items: center;
`

export const HeaderTitle = styled.span`
  flex-grow: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
`

export const HeaderButtonArea = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const HeaderButtonWrapper = styled(Button)`
  margin-left: 0.25rem;
  &:focus::after,
  &:active::after {
    outline: none;
  }
  > * {
    user-select: none;
    width: 1rem;
    height: 1rem;
    display: inline-block;
    position: relative;
    margin-left: -1px;
    margin-top: -1px;
    &:before,
    &:after {
      content: "";
      position: absolute;
    }
  }
`

/**
 * CloseIcon, MinimizeIcon, MaximizeIcon, RestoreIcon
 * must be used in HeaderButtonWrapper
 */

export const CloseIcon = styled.span`
  transform: rotate(45deg);
  &:before {
    height: 100%;
    width: 3px;
    left: 50%;
    transform: translateX(-50%);
    background: ${({ theme }) => theme.materialText};
  }
  &:after {
    height: 3px;
    width: 100%;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    background: ${({ theme }) => theme.materialText};
  }
`

export const MinimizeIcon = styled.span`
  &:before {
    height: 3px;
    width: 100%;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    background: ${({ theme }) => theme.materialText};
  }
`

export const MaximizeIcon = styled.span`
  &::before {
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: ${({ theme }) => {
      const { materialText } = theme
      return `2px 5px inset ${materialText}, 0px 0px 1px 2px inset ${materialText}`
    }};
    background: none;
    height: 1rem;
    width: 1rem;
  }
`

export const RestoreIcon = styled.span`
  &:before {
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: ${({ theme }) => {
      const { materialText } = theme
      return `inset 2px 2px ${materialText}, inset 0 0 1px 2px ${materialText}`
    }};
    width: 1rem;
    height: 1rem;
  }
  &:after {
    left: 0px;
    top: 50%;
    transform: translateX(-25%);
    box-shadow: ${({ theme }) => {
      const { materialText } = theme
      return `inset 0 2px ${materialText}, inset 0 0 0 1px ${materialText}, 1px -1px ${materialText}`
    }};
    background-color: ${({ theme }) => theme.materialDark};
    width: 0.78rem;
    height: 0.78rem;
  }
`

/**
 * Content area in <Window>
 * @param noPadding
 */
export const WindowContentStyled = styled(WindowContent)<{
  noPadding: boolean | undefined
}>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
  min-height: 0;
  height: 100%;
  ${({ noPadding }) =>
    noPadding
      ? css`
          padding: 2px;
        `
      : css`
          padding: 0.5rem;
        `}

  @media print {
    overflow: visible;
  }
`

/**
 * Content area in <Window> with scroll with white background
 * @param fontSizeModifier
 * @param noPadding
 */
export const ScrollViewStyled = styled(ScrollView).attrs({ variant: "field" })<{
  fontSizeModifier?: number
  noPadding?: boolean
}>`
  color: #111111;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* font-family: Georgia, "Times New Roman", Times, serif; */
  font-size: ${({ fontSizeModifier = 0 }) => `${1 + fontSizeModifier / 10}em`};
  line-height: 1.8;
  background-color: #fff;
  & > * {
    padding: ${({ noPadding }) => (noPadding ? "2px" : "1em")};
  }

  @media print {
    overflow: visible;

    & > div {
      overflow: visible;
    }
  }
`

/**
 * Toolbar button in <Window> (can be used in menu)
 */
export const ToolbarButton = styled(Button).attrs({
  variant: "thin",
  size: "sm",
})``

/**
 * used in Window to display extra information with theme background
 */
export const Details = styled(Frame)`
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.material};
`

export const Listul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const ListulItem = styled.li<{
  active: boolean
}>`
  margin-bottom: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;

  background-color: ${({ active, theme }) =>
    active ? theme.materialDark : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.materialTextInvert : theme.materialText};

  :hover {
    background-color: ${({ theme }) => theme.hoverBackground};
    color: ${({ theme }) => theme.materialTextInvert};
  }
`

export const ClearBoth = styled.div`
  clear: both;
  padding-top: 1rem;
`
