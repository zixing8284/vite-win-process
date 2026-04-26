import { useViewportContext } from "@/contexts/viewport"
import Calendar from "./Calendar"
import NormalWindow from "@/components/system/Window/NormalWindow"

const TimeDate = () => {
  const { updateViewportValue } = useViewportContext()

  return (
    <NormalWindow
      windowClose={() => updateViewportValue("showCalendar", false)}
      title="Time&Date"
      draggable={false}
      defaultSize={{
        top: "calc(50% - 300px)",
        left: "calc(50% - 200px)",
      }}
    >
      <Calendar />
    </NormalWindow>
  )
}

export default TimeDate
