import { useCallback, useState } from "react"

type CopiedValue = string | null
type CopyFunc = (value: string) => void

function oldSchoolCopy(text: string) {
  const tempTextArea = document.createElement("textarea")
  tempTextArea.value = text
  document.body.appendChild(tempTextArea)
  tempTextArea.select()
  document.execCommand("Copy")
  document.body.removeChild(tempTextArea)
}

const useCopyToClipboard = () => {
  const [state, setState] = useState<CopiedValue>(null)

  const copyToClipboard: CopyFunc = useCallback((value: string) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value)
          setState(value)
        } else {
          throw new Error("writeText not supported")
        }
      } catch (e) {
        oldSchoolCopy(value)
        setState(value)
      }
    }
    handleCopy()
  }, [])

  return [state, copyToClipboard] as const
}

export default useCopyToClipboard
