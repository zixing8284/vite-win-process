import NormalWindow from "@/components/system/Window/NormalWindow"
import { useViewportContext } from "@/contexts/viewport"
import { WindowContentStyled } from "@/components/system/Window/CommonStyle"
import styled from "styled-components"

const Manual = () => {
  const { updateViewportValue } = useViewportContext()

  return (
    <>
      <NormalWindow
        windowClose={() => updateViewportValue("showManual", false)}
        title="Time&Date"
        draggable={false}
        defaultSize={{
          height: "100%",
          width: "100%",
        }}
      >
        <WindowContentStyled noPadding>
          <ManualContent>
            <TitleArea>
              <h1>Manual</h1>
            </TitleArea>
            <ContentArea>
              <p>Manual</p>
            </ContentArea>
          </ManualContent>
        </WindowContentStyled>
      </NormalWindow>
    </>
  )
}

const ManualContent = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  box-sizing: border-box;
  flex-direction: row;
  margin: 0px auto;
  position: relative;
  z-index: 0;
  min-width: fit-content;
  width: 100%;
  height: 100%;
  max-width: 100%;
`

const TitleArea = styled.div`
  width: 33%;
  background-color: #f5f5f5;
  overflow: auto;
  box-sizing: border-box;
  padding: 1rem;
  border: 1px solid #000;
`

const ContentArea = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  overflow: auto;
  padding: 1rem;
  border: 1px solid #000;
`

export default Manual
