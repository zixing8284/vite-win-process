export const DIALOG_WINDOW_ZINDEX = 1000
export const DESKTOP_CONTAINER_CLASSNAME = "desktop-container"
export const DESKTOP_ZINDEX = 3
// taskbar may contains some tooltips,
// zindex should be higher than desktop zindex
export const TASKBAR_ZINDEX = 4
export const TASKBAR_HEIGHT = "48px"
export const PROCESS_WINDOW_DEFAULT_ZINDEX = 2
export const PROCESS_WINDOW_ACTIVE_ZINDEX = 3
export const PROCESS_WINDOW_INACTIVE_ZINDEX = 2
// normal window zindex should be higher than process window zindex(actvie),
// and lower than process window zindex(inactive)
export const NORMAL_WINDOW_ACTIVE_ZINDEX = 4
export const NORMAL_WINDOW_INACTIVE_ZINDEX = 1

export const IFRAME_CONFIG = {
  referrerPolicy: "no-referrer" as React.HTMLAttributeReferrerPolicy,
  sandbox:
    "allow-downloads allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts",
}

export const ONE_TIME_PASSIVE_EVENT = {
  once: true,
  passive: true,
} as AddEventListenerOptions
