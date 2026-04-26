import { memo } from "react"
import { Button, ButtonProps } from "react95"
import PlayerIcon, { type PlayerIconName } from "./PlayerIcon"

const MediaButton = ({
  icon,
  title = "",
  disabled,
  ...rest
}: {
  icon: PlayerIconName
  title?: string
  disabled?: boolean
} & ButtonProps) => {
  const label = title + (disabled ? " (disabled)" : "")

  return (
    <Button
      disabled={disabled}
      style={{ padding: "0.25rem" }}
      title={label}
      square
      {...rest}
    >
      <PlayerIcon
        name={icon}
        style={disabled ? { filter: "grayscale(100%)", opacity: 0.5 } : {}}
      />
    </Button>
  )
}

const MediaButtonMemo = memo(MediaButton)

export default MediaButtonMemo
