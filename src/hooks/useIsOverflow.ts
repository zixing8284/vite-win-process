import { useLayoutEffect, useState } from "react"

const useIsOverflow = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  callback?: (hasOverflow: boolean) => void,
) => {
  const [isOverflow, setIsOverflow] = useState<boolean | undefined>(undefined)

  useLayoutEffect(() => {
    const { current } = ref

    const trigger = () => {
      const hasOverflow =
        current?.scrollHeight !== undefined &&
        current?.clientHeight !== undefined &&
        current.scrollHeight > current.clientHeight
      setIsOverflow(hasOverflow)
      if (callback) callback(hasOverflow)
    }

    if (current) {
      if ("ResizeObserver" in window) {
        const resizeObserver = new ResizeObserver(() => {
          trigger()
        })
        resizeObserver.observe(current)
        return () => {
          resizeObserver.disconnect()
        }
      }
    }
  }, [ref, callback])

  return isOverflow
}

export default useIsOverflow
