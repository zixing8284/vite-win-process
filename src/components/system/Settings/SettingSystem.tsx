import { Checkbox, GroupBox, Radio, Separator, Slider } from "react95"

import { SField, SPadding, SliderLabel } from "./Settings"
import { useSystemContext } from "@/contexts/system"

const fontSizeMarks = [
  { value: 0.75, label: "0.75" },
  { value: 0.8, label: "0.8" },
  { value: 0.9, label: "0.9" },
  { value: 1, label: "1" },
  { value: 1.1, label: "1.1" },
]

const scanLinesMarks = [
  { value: 0, label: "0" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 75, label: "75" },
  { value: 100, label: "100" },
]

const SettingSystem = () => {
  console.log("SettingSystem")
  const { systemValue, updateSystemValue } = useSystemContext()
  const { taskbarPosition } = systemValue

  const updateTaskbarPosition = (value: typeof taskbarPosition) =>
    updateSystemValue("taskbarPosition", value)
  const toggleVintageFont = (value: boolean) =>
    updateSystemValue("vintageFont", value)
  const setFontSizeMagnification = (value: number) =>
    updateSystemValue("fontSizeMagnification", value)
  const toggleScanLines = (value: boolean) =>
    updateSystemValue("scanLines", value)
  const setScanLinesIntensity = (value: number) =>
    updateSystemValue("scanLinesIntensity", value)
  // const toggleAutoHideTaskbar = (value: boolean) =>
  //   updateSystemValue("autoHideTaskbar", value)

  return (
    <>
      <SField>
        <GroupBox label="Font:">
          <Checkbox
            name="vintageFont"
            value="vintageFont"
            label="Vintage font"
            onChange={() => toggleVintageFont(!systemValue.vintageFont)}
            checked={systemValue.vintageFont}
          />
          <SPadding>
            <SliderLabel>Size:</SliderLabel>
            <Slider
              min={0.75}
              max={1.1}
              step={null}
              value={systemValue.fontSizeMagnification}
              onChange={(val) => setFontSizeMagnification(val)}
              marks={fontSizeMarks}
            />
          </SPadding>
        </GroupBox>
      </SField>
      <SField>
        <GroupBox
          label={
            <Checkbox
              style={{}}
              name="scanLines"
              value="scanLines"
              label="Scan lines"
              onChange={() => toggleScanLines(!systemValue.scanLines)}
              checked={systemValue.scanLines}
            />
          }
        >
          <SPadding>
            <SliderLabel isDisabled={!systemValue.scanLines}>
              Intensity:
            </SliderLabel>
            <Slider
              disabled={!systemValue.scanLines}
              step={25}
              min={0}
              max={100}
              marks={scanLinesMarks}
              value={systemValue.scanLinesIntensity}
              onChange={(val) => setScanLinesIntensity(val)}
            />
          </SPadding>
        </GroupBox>
      </SField>
      <SField>
        <GroupBox label="Taskbar Options:">
          <Radio
            value={taskbarPosition}
            onChange={() => {
              if (taskbarPosition === "top") return
              updateTaskbarPosition("top")
            }}
            checked={taskbarPosition === "top"}
            label="top"
          />
          <Separator />
          <Radio
            value={taskbarPosition}
            onChange={() => {
              if (taskbarPosition === "bottom") return
              updateTaskbarPosition("bottom")
            }}
            checked={taskbarPosition === "bottom"}
            label="bottom"
          />
          <Separator />
          {/* <Checkbox
            name="auto-hide-taskbar"
            label="auto-hide"
            value="auto-hide-taskbar"
            onChange={() => toggleAutoHideTaskbar(!systemValue.autoHideTaskbar)}
            checked={systemValue.autoHideTaskbar}
          /> */}
        </GroupBox>
      </SField>
    </>
  )
}

export default SettingSystem
