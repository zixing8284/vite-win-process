import type { ProcessId, Processes } from "./types"
import {
  PROCESS_WINDOW_ACTIVE_ZINDEX,
  PROCESS_WINDOW_INACTIVE_ZINDEX,
} from "../constants"

export const generateNewWindowState = (
  windows: Processes,
  id: ProcessId[number] | string,
  changes: Partial<Processes[number]> | Partial<Processes[string]>,
) => ({
  ...windows,
  [id]: { ...windows[id], ...changes },
})

export const closeWindow = (windows: Processes, id: ProcessId[number]) =>
  generateNewWindowState(windows, id, { opened: false, focused: false })

export const minimizeWindow = (windows: Processes, id: ProcessId[number]) =>
  generateNewWindowState(windows, id, { minimized: true, focused: false })

export const maximizeWindow = (windows: Processes, id: ProcessId[number]) =>
  generateNewWindowState(windows, id, {
    minimized: false,
    maximized: true,
    focused: true,
  })

export const restoreFromMaximizeWindow = (
  windows: Processes,
  id: ProcessId[number],
) => generateNewWindowState(windows, id, { maximized: false, focused: true })

export const getFocusedWindowId = (windows: Processes) =>
  Object.entries(windows).find(([, { focused }]) => focused)?.[0] as
    | ProcessId[number]
    | undefined

export const unfocusWindow = (windows: Processes, id: ProcessId[number]) =>
  generateNewWindowState(windows, id, {
    focused: false,
    zIndex: PROCESS_WINDOW_INACTIVE_ZINDEX,
  })

export const focusWindow = (windows: Processes, id: ProcessId[number]) => {
  if (windows[id].focused) return windows

  const updatedWindows = generateNewWindowState(windows, id, {
    focused: true,
    zIndex: PROCESS_WINDOW_ACTIVE_ZINDEX,
  })

  const focusedWindowId = getFocusedWindowId(windows)
  if (focusedWindowId) {
    return unfocusWindow(updatedWindows, focusedWindowId)
  }
  return updatedWindows
}

export const openOriginWindow = (windows: Processes, id: ProcessId[number]) => {
  const focusedWindowId = getFocusedWindowId(windows)
  if (focusedWindowId) {
    windows[focusedWindowId].focused = false
    windows[focusedWindowId].zIndex = PROCESS_WINDOW_INACTIVE_ZINDEX
  }

  const newId = `${id}-${Date.now()}`
  return {
    ...windows,
    [newId]: {
      ...windows[id],
      id: newId,
      opened: true,
      focused: true,
      zIndex: PROCESS_WINDOW_ACTIVE_ZINDEX,
    },
  }
}

export const openFeatureWindow = (
  windows: Processes,
  id: ProcessId[number],
) => {
  if (windows[id].opened) return windows
  const updatedWindows = {
    ...windows,
    [id]: {
      ...windows[id],
      opened: true,
      focused: true,
      zIndex: PROCESS_WINDOW_ACTIVE_ZINDEX,
    },
  }

  // find the focused window and set it to false and reset zIndex
  const focusedWindowId = getFocusedWindowId(windows)
  if (focusedWindowId) {
    updatedWindows[focusedWindowId].focused = false
    updatedWindows[focusedWindowId].zIndex = PROCESS_WINDOW_INACTIVE_ZINDEX
  }
  return updatedWindows
}

export const clickFromAppQueue = (
  windows: Processes,
  id: ProcessId[number],
) => {
  const window = windows[id]
  const updatedWindows = { ...windows }

  const updateFocusedWindow = (focusedWindowId: ProcessId[number]) => {
    if (focusedWindowId) {
      updatedWindows[focusedWindowId] = {
        ...updatedWindows[focusedWindowId],
        focused: false,
        zIndex: PROCESS_WINDOW_INACTIVE_ZINDEX,
      }
    }
  }

  if (window.focused) {
    updatedWindows[id] = {
      ...window,
      minimized: !window.minimized,
      focused: false,
    }
  } else {
    const focusedWindowId = getFocusedWindowId(windows)
    updatedWindows[id] = {
      ...window,
      minimized: false,
      focused: true,
      zIndex: PROCESS_WINDOW_ACTIVE_ZINDEX,
    }
    updateFocusedWindow(focusedWindowId as ProcessId[number])
  }
  return updatedWindows
}
