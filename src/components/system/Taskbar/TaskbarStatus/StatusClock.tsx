import useClock from "../../../../hooks/useClock"

const StatusClock = () => {
  const date = useClock()

  return <>{date.time}</>
}

export default StatusClock
