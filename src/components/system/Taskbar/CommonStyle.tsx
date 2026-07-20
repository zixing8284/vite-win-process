import { forwardRef } from "react"
import { Button, MenuList, MenuListItem, MenuListProps } from "react95"
import styled from "styled-components"

export const ButtonStyled = styled(Button).attrs({
  variant: "menu",
  square: true,
})`
  margin-inline-end: 4px;
  margin-inline-start: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const ButtonIcon = styled.img`
  image-rendering: pixelated;
  height: 32px;
  width: 32px;
`
// let MenuList accept ref
export const MenuListStyled = forwardRef<HTMLDivElement, MenuListProps>(
  (props, ref) => <MenuList ref={ref} {...props} />,
)

export const MenuListItemStyled = styled(MenuListItem)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 1em;
`
