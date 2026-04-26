import { useState, useRef, useEffect } from "react"

const useVideo = () => {
  const [playerState, setPlayerState] = useState({
    canPlay: false,
    isPlaying: false,
    progress: 0,
    currentTime: 0,
    speed: 1,
    isMuted: false,
    duration: 0,
    volume: 1,
  })

  const videoRef = useRef<HTMLVideoElement | null>(null)

  const canPlay = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      canPlay: true,
      duration: videoRef.current?.duration || 0,
    }))
  }

  const stopPlay = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      isPlaying: false,
      progress: 0,
      currentTime: 0,
    }))

    if (videoRef.current) {
      videoRef.current.currentTime = 0
    }
  }

  const pausePlay = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      isPlaying: false,
    }))
    console.log("pausePlay")
  }

  const resumePlay = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      isPlaying: true,
    }))
  }

  const togglePlay = () => {
    setPlayerState((prevState) => ({
      ...prevState,
      isPlaying: !prevState.isPlaying,
    }))
  }

  const handleFastForward = (value = 3) => {
    if (videoRef.current) {
      if (videoRef.current.currentTime + value > videoRef.current.duration) {
        return
      }

      videoRef.current.currentTime += value
    }

    handleOnTimeUpdate()
  }

  const handleRewind = (value = 3) => {
    if (videoRef.current) {
      if (videoRef.current.currentTime < value) {
        videoRef.current.currentTime = 0
        return
      }

      videoRef.current.currentTime -= value
    }

    handleOnTimeUpdate()
  }

  const handleOnTimeUpdate = () => {
    const progress =
      videoRef.current?.currentTime && videoRef.current?.duration
        ? (videoRef.current.currentTime / videoRef.current.duration) * 100
        : 0

    setPlayerState({
      ...playerState,
      progress,
      currentTime: videoRef.current?.currentTime || 0,
    })
  }

  const handleVideoProgress = (value: number) => {
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (value / 100) * videoRef.current.duration
      setPlayerState((prevState) => ({
        ...prevState,
        progress: value,
        currentTime: videoRef.current?.currentTime || 0,
      }))
    }
  }

  const handleVideoSpeed = (speed: number) => {
    setPlayerState({
      ...playerState,
      speed,
    })
  }

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    })
  }

  const handleVolumeChange = (volume: number) => {
    setPlayerState({
      ...playerState,
      volume,
    })
  }

  useEffect(() => {
    console.log("playerState.isPlaying", playerState.isPlaying)
    playerState.isPlaying ? videoRef.current?.play() : videoRef.current?.pause()
  }, [playerState.isPlaying])

  useEffect(() => {
    console.log("playerState.isMuted", playerState.isMuted)
    if (videoRef.current) {
      videoRef.current.muted = playerState.isMuted
    }
  }, [playerState.isMuted])

  useEffect(() => {
    console.log("playerState.speed", playerState.speed)
    if (videoRef.current) {
      videoRef.current.playbackRate = playerState.speed
    }
  }, [playerState.speed])

  useEffect(() => {
    console.log("playerState.volume", playerState.volume)
    if (videoRef.current) {
      videoRef.current.volume = playerState.volume
    }
  }, [playerState.volume])

  return {
    videoRef,
    playerState,
    canPlay,
    pausePlay,
    resumePlay,
    stopPlay,
    togglePlay,
    toggleMute,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    handleVolumeChange,
    handleRewind,
    handleFastForward,
  }
}

export default useVideo
