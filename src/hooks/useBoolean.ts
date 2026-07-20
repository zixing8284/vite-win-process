import { useState } from "react"

const useBoolean = (initialState = false) => {
  const [state, setState] = useState<boolean>(initialState)

  const toggle = () => {
    setState(!state)
  }

  const setTrue = () => {
    setState(true)
  }

  const setFalse = () => {
    setState(false)
  }

  return [state, { toggle, setTrue, setFalse }] as const
}

export default useBoolean
