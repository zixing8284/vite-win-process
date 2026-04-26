import { useMemo, useRef, useState, CSSProperties, useEffect } from "react"
import throttle from "lodash.throttle"
import interact from "interactjs"

/**
 * interact.js works not properly with scale and transform: scale CSS property.
 * so dont add neither of them on parent element.
 * https://github.com/taye/interact.js/issues/430
 */

type Partial<T> = {
  [P in keyof T]?: T[P]
}

type restrictSize = {
  width: number
  height: number
}

type UseInteractJSProps = {
  vector?: Partial<typeof initVector>
  // restrict the element to a class or an id name
  restriction?: string
  resizable?: boolean
  draggable?: boolean
  // ignore drag from a class or an id name
  dragIgnoreFrom?: string
  restrictSize?: restrictSize
  defaultSize?: {
    width: CSSProperties["width"]
    height: CSSProperties["height"]
  }
  onDragStart?: (event: Interact.InteractEvent) => void
  onDragMove?: (event: Interact.DragEvent) => void
  onDragEnd?: (event: Interact.InteractEvent) => void
  onResizeStart?: (event: Interact.ResizeEvent) => void
  onResizeMove?: (event: Interact.ResizeEvent) => void
  onResizeEnd?: (event: Interact.ResizeEvent) => void
  clearTransform?: () => void
}

const initVector = {
  vx: 0,
  vy: 0,
}

const useInteract = ({
  vector = initVector,
  resizable = true,
  draggable = true,
  restriction,
  dragIgnoreFrom,
  restrictSize,
  defaultSize,
  onDragStart,
  onDragMove,
  onDragEnd,
  onResizeStart,
  onResizeMove,
  onResizeEnd,
}: UseInteractJSProps) => {
  const [isEnabled, setEnable] = useState(true)
  const [_vector, setVector] = useState({
    ...initVector,
    ...vector,
  })

  const [interactRect, setInteractRect] = useState<
    | { width: CSSProperties["width"]; height: CSSProperties["height"] }
    | undefined
  >(defaultSize)

  const interactRef = useRef<HTMLDivElement | null>(null)
  const dragAllowFromRef = useRef<HTMLDivElement>(null)

  const throttledOnDragMove = useMemo(() => {
    return throttle((event: Interact.DragEvent) => {
      if (!onDragMove) return
      onDragMove(event)
    }, 1000)
  }, [onDragMove])

  const throttledOnResizeMove = useMemo(() => {
    return throttle((event: Interact.ResizeEvent) => {
      if (!onResizeMove) return
      onResizeMove(event)
    }, 1000)
  }, [onResizeMove])

  // interactJSを無効化する
  const disable = () => {
    interact(interactRef.current as unknown as HTMLElement).unset()
  }
  // interactJSを有効化する
  const enable = () => {
    // interact elementが存在しない場合は何もしない
    const interactElement = interactRef.current
    if (!interactElement) return
    const interactInstance = interact(interactElement as unknown as HTMLElement)
    if (!interactInstance) return

    // element may have multiple classes, i want only the last one with dot prefix
    const dragAllowFrom = dragAllowFromRef.current?.className
      .split(" ")
      .map((className) => `.${className}`)
      .pop()

    const dragMoveListener = (event: Interact.InteractEvent) => {
      setVector((prev) => ({
        ...prev,
        vx: prev.vx + event.dx,
        vy: prev.vy + event.dy,
      }))
    }

    const resizeMoveListener = (event: Interact.ResizeEvent) => {
      // get the width and height of the rectangle
      const { width, height } = event.rect

      // translate when resizing from top or left edges
      setVector((prev) => ({
        ...prev,
        vx: prev.vx + (event.deltaRect?.left ?? 0),
        vy: prev.vy + (event.deltaRect?.top ?? 0),
      }))

      setInteractRect((prev) => ({
        ...prev,
        width,
        height,
      }))
    }

    if (draggable) {
      interactInstance.draggable({
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: restriction || "parent",
          }),
        ],
        inertia: false,
        allowFrom: dragAllowFrom || "",
        ignoreFrom: dragIgnoreFrom || "",

        listeners: {
          // call this function on every dragstart event
          start(event) {
            if (onDragStart) onDragStart(event)
          },
          // call the function on every dragmove event
          move(event) {
            dragMoveListener(event)
            throttledOnDragMove(event)
          },
          // call the function on every dragend event
          end(event) {
            if (onDragEnd) onDragEnd(event)
          },
        },
      })
    }

    if (resizable) {
      interactInstance.resizable({
        inertia: false,
        // only resize from bottom and right edges
        edges: { left: false, right: true, bottom: true, top: false },

        modifiers: [
          // force a width/height ratio
          // interact.modifiers.aspectRatio({
          // ratio: "preserve",
          //   modifiers: [
          //     interact.modifiers.restrictSize({
          //       max: restriction,
          //     }),
          //   ],
          // }),

          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: restriction || "parent",
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: {
              width: restrictSize?.width || 0,
              height: restrictSize?.height || 0,
            },
          }),
        ],
        listeners: {
          // call this function on every resizestart event
          start(event) {
            if (onResizeStart) onResizeStart(event)
          },

          // call this function on every resizemove event
          move(event) {
            resizeMoveListener(event)
            throttledOnResizeMove(event)
          },

          // call this function on every resizeend event
          end(event) {
            if (onResizeEnd) onResizeEnd(event)
          },
        },
      })
    }
  }

  useEffect(() => {
    if (isEnabled) {
      enable()
    } else {
      disable()
    }
    return disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled])

  const computedStyle = useMemo(() => {
    const width = interactRect?.width || "auto"
    const height = interactRect?.height || "auto"

    return {
      touchAction: "none",
      userSselect: "none",
      boxSizing: "border-box" as CSSProperties["boxSizing"],
      transform: `translate3D(${_vector.vx}px, ${_vector.vy}px, 0)`,
      position: "absolute" as CSSProperties["position"],
      width,
      height,
    }
  }, [_vector.vx, _vector.vy, interactRect?.height, interactRect?.width])

  return {
    isEnabled,
    enable: () => setEnable(true),
    disable: () => setEnable(false),
    setVector,
    ref: interactRef,
    dragAllowFromRef,
    style: computedStyle,
  }
}

export default useInteract
