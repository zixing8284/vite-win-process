import { Fragment, memo, useCallback, useState } from "react"
import styled from "styled-components"

import { Button, Frame, GroupBox, TextInput, WindowContent } from "react95"
import { ThemeProvider } from "styled-components"
import original from "react95/dist/themes/original"
import { ScrollViewStyled } from "../Window/CommonStyle"
import Loading from "@/components/system/Loading/Loading"
import { Suspense } from "react"
import { lazy } from "react"
import ColorPicker from "./ColorPicker"
import CodeBoard from "./CodeBoard"
import Snackbar from "@/components/system/Snackbar/Snackbar"
import useCopyToClipboard from "@/hooks/useCopyToClipboard"

const themeSeries = {
  anchor: "",
  border: "",
  canvas: "",
  check: "",
  desktopBackground: "",
  flat: "",
  focusSecondary: "",
  header: "",
  hoverBackground: "",
  material: "",
  progress: "",
  tooltip: "",
}

const AllPatterns = lazy(() => import("./AllPatterns"))

const ThemeDesigner = () => {
  console.log("ThemeDesigner render")
  const [themeState, setThemeState] = useState(original)

  const [boardOpen, setBoardOpen] = useState(false)

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const [, copyToClipboard] = useCopyToClipboard()

  const colorPickers = Object.entries(themeState).map(([key, value]) => ({
    name: key,
    color: value,
  }))

  const startParty = Object.keys(themeSeries)

  const colorPickersGroup = startParty.reduce((acc, key) => {
    acc[key] = colorPickers.filter((picker) => picker.name.startsWith(key))
    return acc
  }, {} as Record<string, typeof colorPickers>)

  const swag = useCallback(
    (name: string, color: string) => {
      console.log(name, color)
      setThemeState((prev) => ({
        ...prev,
        [name]: color,
      }))
    },
    [setThemeState],
  )

  const createColorPicker = (name: string) => {
    return (
      <Fragment key={name}>
        <ColorPicker
          name={name}
          value={themeState[name as keyof typeof themeState]}
          onChange={swag}
        />
      </Fragment>
    )
  }

  const copyThemeToClipboard = () => {
    const theme = JSON.stringify(themeState, null, 2)
    copyToClipboard(theme)
    setSnackbarOpen(true)
  }

  return (
    <WindowContent
      style={{
        overflow: "auto",
      }}
    >
      <Container>
        <LeftUp>
          <div
            style={{
              float: "left",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <label
              htmlFor="themeName"
              style={{
                paddingRight: "1rem",
              }}
            >
              {"THEME NAME: "}
            </label>
            <TextInput
              value={themeState.name}
              placeholder="Define custom theme name"
              onChange={(e) => {
                setThemeState((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }}
              id="themeName"
              style={{
                marginRight: "1rem",
              }}
            />
            <Button
              disabled={themeState.name === ""}
              onClick={() => setThemeState((prev) => ({ ...prev, name: "" }))}
            >
              Clear
            </Button>
          </div>

          {snackbarOpen && (
            <Snackbar
              autoHideDuration={1000}
              onDismiss={() => setSnackbarOpen(false)}
            >
              Copied!
            </Snackbar>
          )}

          <Button
            style={{
              float: "right",
            }}
            onClick={copyThemeToClipboard}
          >
            Copy Theme
          </Button>
          <Button
            primary
            style={{
              float: "right",
              fontWeight: "bold",
              marginRight: "1rem",
            }}
            onClick={() => {
              setBoardOpen(!boardOpen)
            }}
            active={boardOpen}
          >
            {"{...}"}
          </Button>
        </LeftUp>
        <LeftDown>
          <GroupBox
            label="Preview:"
            style={{
              boxSizing: "border-box",
              height: "100%",
              width: "100%",
            }}
          >
            <Frame
              variant="field"
              style={{
                padding: "1rem",
                width: "100%",
                height: "100%",
                background: themeState.desktopBackground,
                overflow: "hidden auto",
              }}
            >
              <ThemeProvider theme={themeState}>
                {boardOpen ? (
                  <CodeBoard code={JSON.stringify(themeState, null, 2)} />
                ) : (
                  <Suspense fallback={<Loading />}>
                    <AllPatterns />
                  </Suspense>
                )}
              </ThemeProvider>
            </Frame>
          </GroupBox>
        </LeftDown>

        <RightUp>
          <GroupBox
            label="Switch:"
            style={{
              boxSizing: "border-box",
              height: "100%",
              width: "100%",
            }}
          >
            switch between one-color and linear-gradient
          </GroupBox>
        </RightUp>
        <RightDown>
          <GroupBox
            label="Setting:"
            style={{
              boxSizing: "border-box",
              height: "100%",
              width: "100%",
              display: "flex",
              minWidth: 0,
            }}
          >
            <ScrollViewStyled>
              {Object.entries(colorPickersGroup).map(([key, value]) => {
                return (
                  <GroupBox
                    variant="flat"
                    label={key}
                    key={key}
                    style={{
                      display: "flex",
                    }}
                  >
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      {value.map((picker) => {
                        return createColorPicker(picker.name)
                      })}
                    </div>
                  </GroupBox>
                )
              })}
            </ScrollViewStyled>
          </GroupBox>
        </RightDown>
      </Container>
    </WindowContent>
  )
}
const Container = styled.div`
  display: grid;
  min-width: 0;
  min-height: 0;
  height: 100%;
  grid-template-columns: repeat(7, minmax(6rem, 1fr));
  grid-template-rows: 3rem 3rem repeat(8, minmax(1.6rem, 1fr));
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`

const LeftUp = styled.div`
  grid-area: 1 / 1 / 2 / 6;
  display: inline-flex;
  flex-wrap: nowrap;

  &:after {
    content: "";
    display: table;
    clear: both;
  }
`

const LeftDown = styled.div`
  grid-area: 2 / 1 / 11 / 6;
  user-select: none;
`

const RightUp = styled.div`
  grid-area: 1 / 6 / 3 / 8;
`

const RightDown = styled.div`
  grid-area: 3 / 6 / 11 / 8;
`

const ThemeDesignerMemo = memo(ThemeDesigner)

export default ThemeDesignerMemo
