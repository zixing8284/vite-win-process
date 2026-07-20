import { useRef, useState, useCallback } from "react"

type HoverCallbackRef = (node: HTMLDivElement | null) => void
type HoverReturnType = [HoverCallbackRef, boolean]

const useHover = (): HoverReturnType => {
  const [isHovering, setIsHovering] = useState<boolean>(false)

  const handleMouseOver = useCallback(() => setIsHovering(true), [])

  const handleMouseOut = useCallback(() => setIsHovering(false), [])

  const nodeRef = useRef<HTMLDivElement | null>(null)

  const callbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (nodeRef.current) {
        nodeRef.current.removeEventListener("mouseover", handleMouseOver)
        nodeRef.current.removeEventListener("mouseout", handleMouseOut)
      }

      nodeRef.current = node

      if (nodeRef.current) {
        nodeRef.current.addEventListener("mouseover", handleMouseOver)
        nodeRef.current.addEventListener("mouseout", handleMouseOut)
      }
    },
    [handleMouseOver, handleMouseOut],
  )

  return [callbackRef, isHovering]
}

export default useHover
