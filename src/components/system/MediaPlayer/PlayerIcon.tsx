import { memo } from "react"
import audio from "@/assets/player-icons/audio.png"
import backscroll from "@/assets/player-icons/backscroll.png"
import backseek from "@/assets/player-icons/backseek.png"
import backskip from "@/assets/player-icons/backskip.png"
import eject from "@/assets/player-icons/eject.png"
import forwardscroll from "@/assets/player-icons/forwardscroll.png"
import forwardseek from "@/assets/player-icons/forwardseek.png"
import forwardskip from "@/assets/player-icons/forwardskip.png"
import pause from "@/assets/player-icons/pause.png"
import play from "@/assets/player-icons/play.png"
import selectionend from "@/assets/player-icons/selectionend.png"
import selectionstart from "@/assets/player-icons/selectionstart.png"
import stop from "@/assets/player-icons/stop.png"
import video from "@/assets/player-icons/video.png"
import maximize from "@/assets/player-icons/maximize.png"
import minimize from "@/assets/player-icons/minimize.png"
import unmaximize from "@/assets/player-icons/unmaximize.png"
import mute from "@/assets/player-icons/mute.png"
import unmute from "@/assets/player-icons/unmute.png"
import x from "@/assets/player-icons/x.png"

const imgs = {
  audio,
  backscroll,
  backseek,
  backskip,
  eject,
  forwardscroll,
  forwardseek,
  forwardskip,
  pause,
  play,
  selectionend,
  selectionstart,
  stop,
  video,
  maximize,
  minimize,
  unmaximize,
  x,
  mute,
  unmute,
}

export type PlayerIconName = keyof typeof imgs

const PlayerIcon = ({
  name,
  ...rest
}: {
  name: PlayerIconName
} & React.ImgHTMLAttributes<HTMLImageElement>) => {
  return <img src={imgs[name]} alt={name} {...rest} />
}

const PlayerIconMemo = memo(PlayerIcon)

export default PlayerIconMemo
