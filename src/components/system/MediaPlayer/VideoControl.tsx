import React, { useRef, useState } from "react"
import ProgressBar from "./ProgressBar"
import { Button, ScrollView, Separator, Slider, Toolbar } from "react95"
import MediaButton from "./MediaButton"
import styled from "styled-components"

type VideoControlsProps = {
  playerState: {
    progress: number
    speed: number
    canPlay: boolean
    isPlaying: boolean
    currentTime: number
    duration: number
    volume: number
    isMuted: boolean
  }
  togglePlay: () => void
  handleVideoProgress: (value: number) => void
  handleVideoSpeed: (value: number) => void
  handleVolumeChange: (value: number) => void
  toggleMute: () => void
  stopPlay: () => void
  pausePlay: () => void
  resumePlay: () => void
  handleRewind: (value: number) => void
  handleFastForward: (value: number) => void
  handleFileChange: (source: string, fileType: string) => void
}

const speedOptions = [
  { value: 0.5, label: "0.5x" },
  { value: 1, label: "1x" },
  { value: 1.25, label: "1.25x" },
  { value: 2, label: "2x" },
]

const VideoControls: React.FC<VideoControlsProps> = ({
  playerState,
  togglePlay,
  handleVideoProgress,
  handleVideoSpeed,
  handleVolumeChange,
  toggleMute,
  pausePlay,
  resumePlay,
  stopPlay,
  handleFastForward,
  handleRewind,
  handleFileChange,
}) => {
  const [isSeeking, setIsSeeking] = useState(false)
  const wasPlayingBeforeSeekRef = useRef(false)

  const progressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerState.canPlay) return

    wasPlayingBeforeSeekRef.current = playerState.isPlaying

    if (playerState.isPlaying) {
      pausePlay()
    }

    setIsSeeking(() => true)
    const progressBar = e.currentTarget
    const { left, width } = progressBar.getBoundingClientRect()
    const clickPosition = e.clientX - left
    const progress = (clickPosition / width) * 100

    // important
    setTimeout(() => {
      handleVideoProgress(progress)
    }, 0)
  }

  const progressSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSeeking) return

    const progressBar = e.currentTarget
    const { left, width } = progressBar.getBoundingClientRect()
    const clickPosition = e.clientX - left
    const progress = (clickPosition / width) * 100

    handleVideoProgress(progress)
  }

  const progressSeekEnd = () => {
    setIsSeeking(() => false)

    if (!isSeeking) return

    if (wasPlayingBeforeSeekRef.current) {
      resumePlay()
    }

    wasPlayingBeforeSeekRef.current = false
  }

  const handleFileEject = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "audio/*,video/*"
    input.style.display = "none"
    input.dispatchEvent(new MouseEvent("click"))
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const fileType = file.type
        const url = URL.createObjectURL(file)
        handleFileChange(url, fileType)
      }
    }
  }

  return (
    <>
      <ProgressBar
        progress={playerState.progress}
        handleMouseDown={progressClick}
        handleMouseMove={progressSeek}
        handleMouseUp={progressSeekEnd}
      />

      <Separator />
      <Toolbar>
        <MediaButton
          icon={playerState.isPlaying ? "pause" : "play"}
          title="Play/Pause"
          onClick={togglePlay}
          disabled={!playerState.canPlay}
        />
        <MediaButton
          title="Stop"
          icon="stop"
          onClick={stopPlay}
          disabled={!playerState.canPlay}
        />
        <MediaButton title="Eject" icon="eject" onClick={handleFileEject} />
        <Spacer />

        <MediaButton
          title="Mute/Unmute"
          icon={playerState.isMuted ? "mute" : "unmute"}
          onClick={toggleMute}
        />
        <Slider
          size={"100px"}
          style={{
            margin: "0 1rem",
          }}
          variant="flat"
          min={0}
          max={1}
          step={0.1}
          value={playerState.volume}
          onChange={handleVolumeChange}
        />
        <MediaButton
          title="Rewind 1s"
          icon="backseek"
          onClick={() => handleRewind(1)}
          disabled={!playerState.canPlay}
        />
        <MediaButton
          title="Fast Forward 1s"
          icon="forwardseek"
          onClick={() => handleFastForward(1)}
          disabled={!playerState.canPlay}
        />
        <Spacer />
        <MediaButton title="Start Selection" icon="selectionstart" disabled />
        <MediaButton title="End Selection" icon="selectionend" disabled />
        <Spacer />
        {speedOptions.map((option) => (
          <Button
            key={option.value}
            style={{ padding: "0.25rem" }}
            square
            title={option.label}
            onClick={() => handleVideoSpeed(option.value)}
            disabled={!playerState.canPlay}
          >
            {option.label}
          </Button>
        ))}

        <Spacer />
        <VerticalDivider />
        <Spacer />
        <ScrollView shadow={false} style={{ flexGrow: 1 }}>
          <Toolbar>
            <span style={{ marginLeft: 2 }}>
              {convertToTime(playerState.currentTime)}
            </span>
            <Spacer />
            <span>
              {playerState.currentTime.toFixed(2)} /{" "}
              {playerState.duration.toFixed(2)}
            </span>
          </Toolbar>
        </ScrollView>
      </Toolbar>
    </>
  )
}

const Spacer = styled.div`
  width: 0.5rem;
`

const convertToTime = (time: number) => {
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time - hours * 3600) / 60)
  const seconds = Math.floor(time - hours * 3600 - minutes * 60)
  let result = hours > 0 ? `${hours}:` : ""
  result += `${minutes < 10 ? "0" : ""}${minutes}:`
  result += `${seconds < 10 ? "0" : ""}${seconds}`
  return result
}

const VerticalDivider = styled.div`
  width: 0px;
  margin: 0 --4px;
  align-self: stretch;
  border-left: 2px solid ${({ theme }) => theme.borderDark};
  border-right: 2px solid ${({ theme }) => theme.borderLightest};
`

export default VideoControls
