import { ColorInput } from "react95"
import { createDisabledTextStyles } from "react95/dist/common"
import styled, { css } from "styled-components"
interface Props {
  value: string
  onChange: (color: string) => void
  disabled?: boolean
}

const BackgroundColorPicker = ({ value, onChange, disabled }: Props) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <>
      <CustomColorField>
        <label htmlFor="custom-color">Custom color:</label>
        <ColorInput
          value={value}
          onChange={handleOnChange}
          disabled={disabled}
          id="custom-color"
        />
      </CustomColorField>
    </>
  )
}

const CustomColorField = styled.div<{ isDisabled?: boolean }>`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  label {
    ${({ isDisabled }) =>
      isDisabled &&
      css`
        ${createDisabledTextStyles()}
      `}
  }
`

export default BackgroundColorPicker
