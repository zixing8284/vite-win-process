import { Fragment } from "react"
import { GroupBox, Radio, ScrollView } from "react95"
import themes, { themesLabels } from "@/contexts/system/themes/themes"
import { useSystemContext } from "@/contexts/system"
import { SField } from "./Settings"

const SettingAppearance = () => {
  console.log("SettingAppearance render")
  const { systemValue, updateSystemValue } = useSystemContext()
  return (
    <SField>
      <GroupBox label="Theme:">
        <ScrollView style={{ width: "100%", height: "400px" }}>
          {Object.keys(themesLabels).map((themeName) => (
            <Fragment key={themeName}>
              <Radio
                value={themeName}
                onChange={() =>
                  updateSystemValue(
                    "theme",
                    themes[themeName as keyof typeof themes],
                  )
                }
                checked={systemValue.theme.name === themeName}
                label={themesLabels[themeName as keyof typeof themes]}
                name={themeName}
              />
              <br />
            </Fragment>
          ))}
        </ScrollView>
      </GroupBox>
    </SField>
  )
}

export default SettingAppearance
