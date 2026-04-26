import { Window, WindowContent, ScrollView } from "react95"
import styled from "styled-components"

const CodeBoard = ({ code }: { code: string }) => {
  return (
    <Window
      style={{
        width: "100%",
      }}
    >
      <WindowContent>
        <ScrollView style={{ width: "100%", height: "100%" }}>
          <Code>{code}</Code>
        </ScrollView>
      </WindowContent>
    </Window>
  )
}

const Code = styled.code`
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 0.8rem;
`

export default CodeBoard
