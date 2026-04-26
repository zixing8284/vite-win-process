import { useEffect, useState } from "react"

const useAnalogClock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  // const hourDegrees = hours * 30 + minutes * 0.5
  // const minuteDegrees = minutes * 6
  // const secondDegrees = seconds * 6

  return {
    hours,
    minutes,
    seconds,
  }
}

export default useAnalogClock
