import debounce from "lodash.debounce"
import styled from "styled-components"
import { useMemo } from "react"
import { Monitor } from "react95"
import { SelectOption } from "react95/dist/Select/Select.types"

import { useSystemContext } from "@/contexts/system"
import BackgroundColorPicker from "./BackgroundColorPicker"
import UploadImage from "./UploadImage"
import { Paragraph, ScrollViewStyled } from "../../Window/CommonStyle"
import WallPaperList from "./WallPaperList"
import BackgroundPropery from "./BackgroundProperty"

const SettingBackground = () => {
  console.log("SettingBackground render")
  const { systemValue, updateSystemValue } = useSystemContext()

  const handleChangeWallpapers = (e: SelectOption<string>) => {
    console.log("handleChangeWallpapers")

    const isInWallpaperList = systemValue.wallpapers.find(
      (b) => b.value === e.value,
    )
    if (!isInWallpaperList) return
    updateSystemValue("backgroundImage", e.value)
  }

  const wallpaperOptions = useMemo(() => {
    if (
      systemValue.backgroundImage &&
      !systemValue.wallpapers.find(
        (b) => b.value === systemValue.backgroundImage,
      )
    ) {
      return [
        ...systemValue.wallpapers,
        { value: systemValue.backgroundImage, label: "Custom" },
      ]
    }
    return systemValue.wallpapers
  }, [systemValue.backgroundImage, systemValue.wallpapers])

  const handleChangeBackgroundColor = (color: string) => {
    updateSystemValue("backgroundColor", color)
  }

  const debouncedOnChangeBackgroundColor = debounce(
    handleChangeBackgroundColor,
    100,
  )

  const backgroundStyles = {
    backgroundColor: systemValue.backgroundColor,
    backgroundImage: systemValue.backgroundImage,
    backgroundSize: systemValue.backgroundSize,
    backgroundRepeat: systemValue.backgroundRepeat,
    backgroundPosition: systemValue.backgroundPosition,
  }

  return (
    <>
      <MonitorStyled backgroundStyles={backgroundStyles} />
      <WallPaperArea>
        <div
          style={{
            flex: "1 1 300px",
          }}
        >
          <Paragraph>Wallpaper:</Paragraph>
          <ScrollViewStyled noPadding={false}>
            <WallPaperList
              style={{
                height: "300px",
              }}
              backgroundImage={systemValue.backgroundImage}
              wallpaperOptions={wallpaperOptions}
              onChange={handleChangeWallpapers}
            />
          </ScrollViewStyled>
        </div>

        <div
          style={{
            flex: "0 1 160px",
          }}
        >
          <BackgroundColorPicker
            value={systemValue.backgroundColor ?? "transparent"}
            onChange={debouncedOnChangeBackgroundColor}
          />
          <BackgroundPropery
            systemValue={systemValue}
            onChange={updateSystemValue}
          />

          <UploadImage />
        </div>
      </WallPaperArea>
    </>
  )
}

const MonitorStyled = styled(Monitor)`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`

const WallPaperArea = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  min-height: 0px;
`

export default SettingBackground
