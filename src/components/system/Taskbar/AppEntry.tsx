import { memo, useCallback } from "react"
import { Tooltip } from "react95"

import type { ProcessId } from "@/contexts/process/types"
import { useWindowsDispatch } from "@/contexts/process/useProcessContext"
import { ButtonIcon, ButtonStyled } from "./CommonStyle"

const AppEntry = ({
  title,
  Icon,
  id,
  taskbarPosition,
  type,
}: {
  title: string
  Icon: string
  id: ProcessId[number]
  taskbarPosition: "top" | "bottom"
  type: "feature" | "origin"
}) => {
  console.log("AppEntry render")

  const dispatch = useWindowsDispatch()

  const handleFeatureWindowClick = useCallback(() => {
    // open the window
    dispatch({
      type: "OPEN_FEATURE_WINDOW",
      payload: { id },
    })
  }, [dispatch, id])

  const handleOriginWindowClick = useCallback(() => {
    dispatch({
      type: "OPEN_ORIGIN_WINDOW",
      payload: { id },
    })
  }, [dispatch, id])

  return (
    <>
      <Tooltip
        text={title}
        enterDelay={300}
        leaveDelay={0}
        position={taskbarPosition === "top" ? "bottom" : "top"}
      >
        <ButtonStyled
          onClick={
            type === "feature"
              ? () => handleFeatureWindowClick()
              : () => handleOriginWindowClick()
          }
        >
          <span role="img" aria-label={title}>
            <ButtonIcon src={Icon} alt="icon" />
          </span>
        </ButtonStyled>
      </Tooltip>
    </>
  )
}

const AppEntryMemo = memo(AppEntry)

export default AppEntryMemo
