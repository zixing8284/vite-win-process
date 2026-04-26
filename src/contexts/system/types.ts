import { CSSProperties } from "react"

import themes from "@/contexts/system/themes/themes"

export interface Wallpaper {
  value: string
  label: string
}

export interface SystemValue {
  theme: (typeof themes)["original"]
  vintageFont: boolean
  fontSizeMagnification: number
  scanLines: boolean
  scanLinesIntensity: number
  wallpapers: Wallpaper[]
  backgroundImage: CSSProperties["backgroundImage"]
  backgroundColor: CSSProperties["backgroundColor"]
  backgroundRepeat: CSSProperties["backgroundRepeat"]
  backgroundSize: CSSProperties["backgroundSize"]
  backgroundPosition: CSSProperties["backgroundPosition"]
  taskbarPosition: "top" | "bottom"
  autoHideTaskbar: boolean
}

export interface SystemContextType {
  systemValue: SystemValue
  storedSystemValue: SystemValue
  updateSystemValue: (
    key: keyof SystemValue,
    value: SystemValue[keyof SystemValue],
  ) => void
  saveSystemLocalStorage: (newSystemValue: SystemValue) => void
}
