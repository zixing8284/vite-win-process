import { useMemo } from "react"
import styled from "styled-components"
import { Button } from "react95"

import type { ProcessId } from "@/contexts/process/types"
import {
  useDynamicWindowsContext,
  useWindowsDispatch,
} from "@/contexts/process/useProcessContext"

const RunningQueue = () => {
  console.log("RunningQueue render")
  const windows = useDynamicWindowsContext()
  const dispatch = useWindowsDispatch()

  const windowEntries = useMemo(() => Object.entries(windows), [windows])

  const handleClick = (id: ProcessId[number]) => {
    dispatch({
      type: "CLICK_FROM_APP_QUEUE",
      payload: { id },
    })
  }

  return (
    <>
      {windowEntries.map(([id, window]) => {
        const { title, opened, focused, Icon } = window
        return (
          opened && (
            <RunningQueueButton
              key={id}
              onClick={() => {
                handleClick(id as ProcessId[number])
              }}
              active={focused}
            >
              <img src={Icon} alt="icon" />
              <span>{title}</span>
            </RunningQueueButton>
          )
        )
      })}
    </>
  )
}

const RunningQueueButton = styled(Button)`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 15rem;
  min-width: 0px;
  font-weight: bold;
  margin-inline-end: 0.25rem;
  margin-inline-start: 0.25rem;
  outline: none;
  &:after,
  &:focus:after {
    outline: none;
  }
  > img {
    margin-inline-end: 0.25rem;
    margin-inline-start: 0.25rem;
    margin-top: auto;
    margin-bottom: auto;
    background-size: 50% 50%;
    width: 16px;
    height: 16px;
  }
  > span {
    margin-inline-start: 0.25rem;
    margin-inline-end: 0.25rem;
    margin-top: auto;
    margin-bottom: auto;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
    text-align: left;
  }
`

export default RunningQueue
