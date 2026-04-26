import React, { CSSProperties } from "react"

export type StaticProcessId = [
  "Sample",
  "ThemeDesigner",
  "MediaPlayer",
  "PDFReader",
  "CustomSetting",
]

export type ProcessId = StaticProcessId | string[]

export type Processes = {
  Sample: Process
  ThemeDesigner: Process
  MediaPlayer: Process
  CustomSetting: Process
  PDFReader: Process
} & Record<string, Process>

export type Process = {
  type: "feature" | "origin"
  Component: React.LazyExoticComponent<React.ComponentType>
  Icon: string
  title: string
  singleton: boolean
  maximized?: boolean
  minimized?: boolean
  focused: boolean
  opened: boolean
  resizable: boolean
  zIndex: number
  defaultSize: {
    resizeMinWidth: number
    resizeMinHeight: number
    width?: CSSProperties["width"]
    height?: CSSProperties["height"]
    top: CSSProperties["top"]
    left: CSSProperties["left"]
  }
}
