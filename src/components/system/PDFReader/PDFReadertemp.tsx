import { useState } from "react"
import styled from "styled-components"
import { Toolbar } from "react95"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

import { ScrollViewStyled } from "@/components/system/Window/CommonStyle"
import NormalWindow from "../Window/NormalWindow"
import testPDF from "/test.pdf"
import "./pdfreader.css"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString()

const options = {
  cMapUrl: "/cmaps/",
}

const DocumentWrapper = styled.div`
  margin: 0 auto;
  position: relative;
  z-index: 0;
  min-width: fit-content;
  width: 100%;
  height: 100%;
  max-width: 100%;
`

const PDFReader = () => {
  // const [numPages, setNumPages] = useState<number | null>()
  const [pageNumber, setPageNumber] = useState(1)

  // function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
  //   setPageNumber(1)
  //   setNumPages(numPages)
  // }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset)
  }

  function previousPage() {
    changePage(-1)
  }

  function nextPage() {
    changePage(1)
  }

  // function onItemClick({ pageNumber: itemPageNumber }: { pageNumber: number }) {
  //   setPageNumber(itemPageNumber)
  // }

  return (
    <>
      <NormalWindow
        title="PDF Reader"
        draggable={true}
        defaultSize={{
          width: "100%",
          height: "100%",
        }}
      >
        <Toolbar>
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={previousPage}
          >
            Previous
          </button>
          <button type="button" onClick={nextPage}>
            Next
          </button>
        </Toolbar>
        <ScrollViewStyled
          style={{
            backgroundColor: "#525659",
          }}
        >
          <DocumentWrapper>
            <Document
              options={options}
              file={testPDF}
              // onLoadSuccess={onDocumentLoadSuccess}
              className={"pdfreader-pdfDocument"}
            >
              <Page
                pageNumber={pageNumber || 1}
                scale={1.5}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                renderMode="canvas"
                className={"pdfreader-pdfPage"}
              />
            </Document>
          </DocumentWrapper>
        </ScrollViewStyled>
      </NormalWindow>
    </>
  )
}

export default PDFReader
