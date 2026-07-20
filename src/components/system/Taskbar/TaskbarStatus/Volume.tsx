import { useState } from "react"
import { Window, Slider } from "react95"
import styled, { css } from "styled-components"

import { useSystemContext } from "@/contexts/system"
import type { SystemValue } from "@/contexts/system/types"

import Audio0 from "@/assets/icons/audio0.png"
import Audio1 from "@/assets/icons/audio1.png"
import Audio2 from "@/assets/icons/audio2.png"

const Volume = () => {
  console.log("Volume render")
  const [volume, setVolume] = useState(100)
  const [showSlidePanel, setShowSlidePanel] = useState(false)

  const getVolumeImage = () => {
    if (volume === 0) {
      return Audio0
    } else if (volume < 33) {
      return Audio1
    } else if (volume < 66) {
      return Audio2
    } else {
      return Audio2
    }
  }

  const changeVolume = (volume: number) => {
    setVolume(volume)
  }

  const toggleSlidePanel = () => {
    setShowSlidePanel(!showSlidePanel)
  }

  return (
    <>
      {showSlidePanel && (
        <SlidePanel volume={volume} changeVolume={changeVolume} />
      )}
      <img
        style={{
          width: "24px",
          height: "24px",
        }}
        src={getVolumeImage()}
        alt="volume"
        onClick={toggleSlidePanel}
      />
    </>
  )
}

type SlidePanelProps = {
  volume: number
  changeVolume: (volume: number) => void
}

const SlidePanelContainer = styled.div<{
  taskbarPosition: SystemValue["taskbarPosition"]
}>`
  background-color: ${({ theme }) => theme.material};
  position: absolute;
  z-index: 9999;
  ${({ taskbarPosition }) => {
    switch (taskbarPosition) {
      case "top":
        return css`
          top: 100%;
          left: 0;
        `
      case "bottom":
        return css`
          bottom: 100%;
          left: 0;
        `
    }
  }}
`

const SlidePanel = ({ volume, changeVolume }: SlidePanelProps) => {
  console.log("ControlPanel render")
  const { systemValue } = useSystemContext()
  const { taskbarPosition } = systemValue
  return (
    <SlidePanelContainer taskbarPosition={taskbarPosition}>
      <Window style={{ padding: "1rem" }}>
        <Slider
          disabled
          min={0}
          size={100}
          max={100}
          step={5}
          value={volume}
          orientation="vertical"
          marks={[
            { value: 0, label: "0" },
            { value: 100, label: "100" },
          ]}
          onChange={(e) => changeVolume(e)}
        />
      </Window>
    </SlidePanelContainer>
  )
}

export default Volume
