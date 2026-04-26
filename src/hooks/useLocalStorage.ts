import { useState } from "react"

const useLocalStorage = <T>(storageKey: string, falllbackState: T) => {
  const [state, setState] = useState(() => {
    return (
      JSON.parse(localStorage.getItem(storageKey) || "null") ?? falllbackState
    )
  })

  const setLocalStorageState = (newState: T | object) => {
    localStorage.setItem(storageKey, JSON.stringify(newState))
    setState(newState)
  }

  return [state, setLocalStorageState] as const
}

export default useLocalStorage
