import { memo, useCallback, useState } from "react"
import {
  Toolbar,
  Handle,
  Table,
  TableHead,
  TableRow,
  TableHeadCell,
  TableBody,
  TableDataCell,
} from "react95"

import {
  WindowContentStyled,
  ScrollViewStyled,
  ToolbarButton,
  FrameStyled,
} from "@/components/system/Window/CommonStyle"

const Sample = () => {
  console.log("TextReader render")
  const [, setStatus] = useState("")

  const [fontSize, setFontSize] = useState(0)

  const handleIncreaseFont = useCallback(() => {
    setFontSize((fontSize: number) => fontSize + 1)
  }, [])
  const handleDecreaseFont = useCallback(() => {
    setFontSize((fontSize) => fontSize - 1)
  }, [])
  const handleIncreaseFontMouseEnter = useCallback(() => {
    setStatus("Increase the font size")
  }, [])

  const handleDecreaseFontMouseEnter = useCallback(() => {
    setStatus("Decrease the font size")
  }, [])

  const handleToolbarMouseLeave = useCallback(() => {
    setStatus("")
  }, [])

  return (
    <>
      <Toolbar>
        <Handle />
        <ToolbarButton
          onClick={handleIncreaseFont}
          onMouseEnter={handleIncreaseFontMouseEnter}
          onMouseLeave={handleToolbarMouseLeave}
        >
          Inc
        </ToolbarButton>
        <ToolbarButton
          onClick={handleDecreaseFont}
          onMouseEnter={handleDecreaseFontMouseEnter}
          onMouseLeave={handleToolbarMouseLeave}
        >
          Dec
        </ToolbarButton>
      </Toolbar>

      <WindowContentStyled noPadding={true}>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Type</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell disabled>Level</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableDataCell style={{ textAlign: "center" }}>
                <span role="img" aria-label="LEAF">
                  🌿
                </span>
              </TableDataCell>
              <TableDataCell>Bulbasaur</TableDataCell>
              <TableDataCell>64</TableDataCell>
            </TableRow>
            <TableRow>
              <TableDataCell style={{ textAlign: "center" }}>
                <span role="img" aria-label="fire">
                  🔥
                </span>
              </TableDataCell>
              <TableDataCell>Charizard</TableDataCell>
              <TableDataCell>209</TableDataCell>
            </TableRow>
            <TableRow>
              <TableDataCell style={{ textAlign: "center" }}>
                <span role="img" aria-label="lightning">
                  ⚡
                </span>
              </TableDataCell>
              <TableDataCell>Pikachu</TableDataCell>
              <TableDataCell>82</TableDataCell>
            </TableRow>
          </TableBody>
        </Table>

        <ScrollViewStyled fontSizeModifier={fontSize} noPadding={false}>
          <h1>Sample Text</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            sollicitudin, nunc ut efficitur tincidunt, nisl nunc consectetur
            nisi, euismod aliquam nisl nunc euismod nisi. Donec sollicitudin,
            nunc ut efficitur tincidunt, nisl nunc consectetur nisi, euismod
            aliquam nisl nunc euismod nisi.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            sollicitudin, nunc ut efficitur tincidunt, nisl nunc consectetur
            nisi, euismod aliquam nisl nunc euismod nisi. Donec sollicitudin,
            nunc ut efficitur tincidunt, nisl nunc consectetur nisi, euismod
            aliquam nisl nunc euismod nisi.
          </p>
          {/* some more paragraphs to make the scroll view scrollable */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            sollicitudin, nunc ut efficitur tincidunt, nisl nunc consectetur
            nisi, euismod aliquam nisl nunc euismod nisi. Donec sollicitudin,
            nunc ut efficitur tincidunt, nisl nunc consectetur nisi, euismod
            aliquam nisl nunc euismod nisi.
          </p>

        </ScrollViewStyled>
      </WindowContentStyled>

      <FrameStyled variant="well" />
    </>
  )
}

const SampleMemo = memo(Sample)

export default SampleMemo
