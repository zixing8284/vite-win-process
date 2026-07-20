import { memo, useEffect, useState } from "react"
import styled from "styled-components"

import useVideo from "./useVideo"
import VideoPlayerMenu from "./PlayerMenu"
import VideoControl from "./VideoControl"

const MediaPlayer = () => {
  // console.log("render VideoPlayer")
  const [src, setSrc] = useState("")

  const [showVideo, setShowVideo] = useState(true)

  const handleSourceLoad = (source: string, fileType: string) => {
    setSrc(source)
    console.log("source", source)
    // cause we changed the src, we need to stop the video
    stopPlay()

    if (fileType === "video/mp4") {
      setShowVideo(true)
    } else {
      setShowVideo(false)
    }
  }

  const showVideoStyle = {
    display: showVideo ? "flex" : "none",
  }

  useEffect(() => {
    return () => {
      if (src) {
        URL.revokeObjectURL(src)
      }
    }
  }, [src])

  const {
    videoRef,
    playerState,
    stopPlay,
    canPlay,
    togglePlay,
    toggleMute,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    handleVolumeChange,
    handleRewind,
    handleFastForward,
    pausePlay,
    resumePlay,
  } = useVideo()

  return (
    <GridWrapper>
      <VideoPlayerMenu />
      <GridVideo>
        <VideoView style={showVideoStyle}>
          <Video
            ref={videoRef}
            onTimeUpdate={handleOnTimeUpdate}
            onCanPlay={canPlay}
            onEnded={stopPlay}
            src={src}
          />
        </VideoView>
        <div style={{ minWidth: 0, gridRow: "2/3" }}>
          <SimpleDivider />
          <VideoControl
            playerState={playerState}
            togglePlay={togglePlay}
            pausePlay={pausePlay}
            resumePlay={resumePlay}
            handleVideoProgress={handleVideoProgress}
            handleVideoSpeed={handleVideoSpeed}
            handleVolumeChange={handleVolumeChange}
            toggleMute={toggleMute}
            stopPlay={stopPlay}
            handleRewind={handleRewind}
            handleFastForward={handleFastForward}
            handleFileChange={handleSourceLoad}
          />
        </div>
      </GridVideo>
    </GridWrapper>
  )
}

const GridWrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  height: 100%;
  min-height: 0;
`
const GridVideo = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: 0;
`
const VideoView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(0, 0, 0);
  min-height: 0;
  flex-grow: 1;
  grid-row: 1/2;
`

const Video = styled.video`
  max-width: 100%;
  max-height: 100%;
`
const SimpleDivider = styled.hr`
  height: 0;
  margin: 0;
  border-bottom: 1px solid ${({ theme }) => theme.borderLightest};
`

const VideoPlayerMemo = memo(MediaPlayer)

export default VideoPlayerMemo
