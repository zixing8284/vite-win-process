import { useState, useRef, memo } from "react"
import styled, { css } from "styled-components"
import { Tab, TabBody, Tabs, Button } from "react95"

// import useOutsideClick from "@/hooks/useOutsideClick"
import { useSystemContext } from "@/contexts/system"
import SettingSystem from "./SettingSystem"
import SettingBackground from "./SettingBackground/SettingBackground"
import SettingAppearance from "./SettingAppearance"

import {
  FrameStyled,
  WindowContentStyled,
  createDisabledTextStyles,
} from "../Window/CommonStyle"

const Settings = () => {
  console.log("Settings render")

  const { systemValue, storedSystemValue, saveSystemLocalStorage } =
    useSystemContext()

  const [activeTab, setActiveTab] = useState(0)
  // const [isFileMenuOpen, setIsFileMenuOpen] = useState(false)

  // const fileMenuRef = useOutsideClick<HTMLDivElement>(() => {
  //   setIsFileMenuOpen(false)
  // })

  const isAppValueChange =
    JSON.stringify(systemValue) !== JSON.stringify(storedSystemValue)

  const applySetting = () => {
    saveSystemLocalStorage(systemValue)
  }

  const handleTabChange = (value: number) => setActiveTab(value)
  const tabBodyRef = useRef<HTMLDivElement>(null)

  return (
    <>
      {/* <Toolbar>
        <div style={{ position: "relative" }}>
          <Button
            variant="menu"
            size="sm"
            onClick={() => {
              setIsFileMenuOpen(!isFileMenuOpen)
            }}
          >
            File
          </Button>
          {isFileMenuOpen && (
            <MenuListStyled
              ref={fileMenuRef}
              style={{
                position: "absolute",
                left: "0",
                top: "100%",
                zIndex: 1 + 1,
              }}
              onClick={() => {
                setIsFileMenuOpen(false)
              }}
            >
              <MenuListItem disabled>
                <span role="img" aria-label="🔙">
                  🔙
                </span>
                Logout
              </MenuListItem>
            </MenuListStyled>
          )}
        </div>
      </Toolbar> */}
      <WindowContentStyled noPadding={false}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab value={0}>Appearance</Tab>
          <Tab value={1}>Background</Tab>
          <Tab value={2}>System</Tab>
        </Tabs>
        <TabBodyStyled ref={tabBodyRef}>
          {
            {
              0: <SettingAppearance />,
              1: <SettingBackground />,
              2: <SettingSystem />,
            }[activeTab]
          }
        </TabBodyStyled>

        <WindowResponseArea>
          <Button primary>Ok</Button>
          <Button>Cancel</Button>
          <Button onClick={applySetting} disabled={!isAppValueChange}>
            Apply
          </Button>
        </WindowResponseArea>
      </WindowContentStyled>

      <FrameStyled variant="well" />
    </>
  )
}

const TabBodyStyled = styled(TabBody)`
  flex-grow: 1;
  overflow: auto;
`

// let MenuList accept ref
// const MenuListStyled = forwardRef<HTMLDivElement, MenuListProps>(
//   (props, ref) => <MenuList ref={ref} {...props} />,
// )

export const SField = styled.div<{ flex?: boolean }>`
  margin-bottom: 1.5rem;
  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `}
`

export const SPadding = styled.div`
  padding: 8px 16px;
`

export const SliderLabel = styled.label<{ isDisabled?: boolean }>`
  display: inline-block;
  margin-bottom: 0.5rem;
  margin-left: -1rem;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      ${createDisabledTextStyles()}
    `}
`

const WindowResponseArea = styled.div`
  display: flex;
  padding-top: 1rem;
  margin-top: auto;
  margin-bottom: 0.5rem;
  justify-content: flex-end;
  // 子要素の間の余白を設定
  & > * + * {
    margin-left: 0.5rem;
  }
  // 子要素のwidthを均等にする
  & > * {
    min-width: 4.6rem;
  }
`

const SettingsMemo = memo(Settings)
export default SettingsMemo
