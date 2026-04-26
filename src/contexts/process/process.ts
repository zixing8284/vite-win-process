import { lazy } from "react"

import type { Processes } from "./types"
import { PROCESS_WINDOW_DEFAULT_ZINDEX } from "../constants"
// import FolderIcon from "@/assets/icons/folder.ico" // 文件中心
// import PersonInfoIcon from "@/assets/icons/person-info.ico" // 人员信息
// import ManageIcon from "@/assets/icons/manage.ico" // 日常管理
import InfoIcon from "@/assets/icons/info.ico"
// import PrintIcon from "@/assets/icons/printer.ico"

import SettingIcon from "@/assets/icons/setting.ico"
import TextReaderIcon from "@/assets/icons/text-reader.ico"
import MediaIcon from "@/assets/icons/media.ico"
import CustomIcon from "@/assets/icons/custom.png"

const Settings = lazy(() => import("@/components/system/Settings/Settings"))
const Sample = lazy(() => import("@/components/system/Sample/Sample"))
const ThemeDesigner = lazy(
  () => import("@/components/system/ThemeDesigner/ThemeDesigner"),
)
const MediaPlayer = lazy(
  () => import("@/components/system/MediaPlayer/MediaPlayer"),
)
const PDFReader = lazy(() => import("@/components/system/PDFReader/PDFReader"))

// TODO 目前的设计是，origin类型的窗口singleton是false，feature类型的窗口singleton是true
// 但是类型并没有体现出来，需要改进
// 同时在context.ts中 “OPEN_FEATURE_WINDOW” 的case中，也需要改进(判断singleton)

export const staticWindows: Processes = {
  MediaPlayer: {
    type: "origin",
    Component: MediaPlayer,
    Icon: MediaIcon,
    singleton: false,
    title: "Media Player",
    focused: false,
    opened: false,
    maximized: false,
    minimized: false,
    resizable: false,
    zIndex: PROCESS_WINDOW_DEFAULT_ZINDEX,
    defaultSize: {
      resizeMinWidth: 500,
      resizeMinHeight: 500,
      width: "800px",
      height: "600px",
      top: "calc(50% - 300px)",
      left: "calc(50% - 400px)",
    },
  },
  PDFReader: {
    type: "origin",
    Component: PDFReader,
    Icon: TextReaderIcon,
    singleton: false,
    title: "PDF Reader",
    focused: false,
    opened: false,
    maximized: false,
    minimized: false,
    resizable: false,
    zIndex: PROCESS_WINDOW_DEFAULT_ZINDEX,
    defaultSize: {
      resizeMinWidth: 500,
      resizeMinHeight: 500,
      width: "800px",
      height: "600px",
      top: "calc(50% - 300px)",
      left: "calc(50% - 400px)",
    },
  },
  Sample: {
    type: "feature",
    Component: Sample,
    Icon: InfoIcon,
    singleton: true,
    title: "sample",
    focused: false,
    opened: false,
    maximized: false,
    minimized: false,
    resizable: true,
    zIndex: PROCESS_WINDOW_DEFAULT_ZINDEX,
    defaultSize: {
      resizeMinWidth: 480,
      resizeMinHeight: 640,
      width: "480px",
      height: "640px",
      top: "calc(50% - 320px)",
      left: "calc(50% - 240px)",
    },
  },
  CustomSetting: {
    type: "feature",
    Component: Settings,
    Icon: SettingIcon,
    singleton: true,
    title: "Custom",
    focused: false,
    opened: false,
    maximized: false,
    minimized: false,
    resizable: false,
    zIndex: PROCESS_WINDOW_DEFAULT_ZINDEX,
    defaultSize: {
      resizeMinWidth: 500,
      resizeMinHeight: 500,
      width: "600px",
      height: "600px",
      top: "calc(50% - 300px)",
      left: "calc(50% - 400px)",
    },
  },
  ThemeDesigner: {
    type: "feature",
    Component: ThemeDesigner,
    Icon: CustomIcon,
    singleton: true,
    title: "Theme Designer",
    focused: false,
    opened: false,
    maximized: false,
    minimized: false,
    resizable: true,
    zIndex: PROCESS_WINDOW_DEFAULT_ZINDEX,
    defaultSize: {
      resizeMinWidth: 500,
      resizeMinHeight: 500,
      width: "800px",
      height: "600px",
      top: "calc(50% - 300px)",
      left: "calc(50% - 400px)",
    },
  },
}

export const dynamicWindows: Processes = {
  ...staticWindows,
}
