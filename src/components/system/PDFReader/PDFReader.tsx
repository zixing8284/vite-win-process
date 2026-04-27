import React, { useEffect, useState } from "react"
import styled from "styled-components"

import { WindowContentStyled } from "@/components/system/Window/CommonStyle"

import { IFRAME_CONFIG } from "@/contexts/constants"

const DocumentWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  z-index: 0;
  min-width: fit-content;
  width: 100%;
  height: 100%;
  max-width: 100%;
`

type PDFReaderProps = {
  pdfURL?: string
}

const defaultPdfUrl = `${import.meta.env.BASE_URL}test.pdf`

const PDFReader = ({ pdfURL = defaultPdfUrl }: PDFReaderProps) => {
  const [loaded, setLoaded] = useState(false)
  const iframeRef = React.useRef<HTMLIFrameElement>(null)
  const windowRef = React.useRef<HTMLDivElement>(null)
  const viewerSrc = `${import.meta.env.BASE_URL}pdfjs-4.0.189-dist/web/viewer.html?file=${encodeURIComponent(pdfURL)}`

  useEffect(() => {
    const handleMouseDown = () => {
      // Dispatch a mousedown event on the windowRef
      windowRef.current?.dispatchEvent(
        new MouseEvent("mousedown", {
          view: window,
          bubbles: true,
          cancelable: true,
        }),
      )
    }

    if (loaded && iframeRef.current?.contentWindow) {
      iframeRef.current?.contentWindow?.addEventListener(
        "mousedown",
        handleMouseDown,
      )
    }
  }, [loaded])

  return (
    <>
      <WindowContentStyled
        ref={windowRef}
        noPadding
        style={{
          backgroundColor: "#525659",
        }}
      >
        <DocumentWrapper>
          <div
            style={{
              background: "transparent",
              minWidth: "fit-content",
              height: "100%",
              position: "relative",
              margin: "0 auto",
            }}
          >
            <iframe
              ref={iframeRef}
              onLoad={() => setLoaded(true)}
              src={viewerSrc}
              width={"100%"}
              height={"100%"}
              style={{
                position: "relative",
                zIndex: 1,
              }}
              {...IFRAME_CONFIG}
            />
          </div>
        </DocumentWrapper>
      </WindowContentStyled>
    </>
  )
}

const PDFReaderMemo = React.memo(PDFReader)

export default PDFReaderMemo
