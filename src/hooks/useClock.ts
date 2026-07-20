import { useEffect, useState } from "react"

const dateFormatter = Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  weekday: "long",
})

const useClock = () => {
  const [date, setDate] = useState<string>()

  useEffect(() => {
    let timer: number
    const clock = () => {
      const date = new Date()

      setDate(dateFormatter.format(date))

      const seconds = date.getSeconds() * 1000 + date.getMilliseconds()
      timer = window.setTimeout(clock, 60000 - seconds)
    }
    clock()
    return () => {
      window.clearTimeout(timer)
    }
  }, [])

  return {
    date,
    week: date?.split(" ")[0],
    time: date?.split(" ")[1],
  }
}

export default useClock
