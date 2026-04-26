import styled from "styled-components"
import style from "./lock-screen.module.css"
import useClock from "../../../hooks/useClock"
import { useViewportContext } from "@/contexts/viewport"

const TimeContainer = styled.div`
  position: absolute;
  bottom: 4rem;
  left: 4rem;
  font-family: "JetBrains Mono", monospace, "Roboto", sans-serif;
`

const LockScreen = () => {
  const { week, time } = useClock()

  const { updateViewportValue } = useViewportContext()
  return (
    <>
      <div className={style.lockscreen}>
        <div className={style.enter}></div>
        <TimeContainer>
          <div className={style.time}>{time}</div>
          <div className={style.date}>{week}</div>
        </TimeContainer>
        <div className={style.panel}>
          <div className={style.panelitem}>
            <button
              onClick={() => updateViewportValue("showLockScreen", false)}
              aria-label="进入"
            >
              进入
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default LockScreen
