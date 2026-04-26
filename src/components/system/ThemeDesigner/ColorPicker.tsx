import React, { Fragment, useCallback, useMemo } from "react"
import { ColorInput } from "react95"
import throttle from "lodash.throttle"

type ColorPickerProps = {
  name: string
  value: string
  onChange?: (name: string, color: string) => void
}

const ColorPicker = ({
  name,
  value,
  onChange: onChangeProp,
}: ColorPickerProps) => {
  const onChange = useCallback(
    (name: string, color: string) => {
      onChangeProp && onChangeProp(name, color)
    },
    [onChangeProp],
  )

  const throttledOnChange = useMemo(() => throttle(onChange, 100), [onChange])

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      throttledOnChange(e.target.name, e.target.value)
    },
    [throttledOnChange],
  )

  return (
    <Fragment>
      <label htmlFor={name}>{name}</label>
      <ColorInput
        value={value}
        onChange={handleOnChange}
        name={name}
        id={name}
      />
    </Fragment>
  )
}

export default ColorPicker
