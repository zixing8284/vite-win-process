import { styleReset } from "react95"
import { createGlobalStyle, css } from "styled-components"
import { createScrollbars } from "react95/dist/common"

import type { SystemValue } from "@/contexts/system/types"
import { useSystemContext } from "@/contexts/system"

const GlobalStylesWrapper = () => {
  const { systemValue } = useSystemContext()
  return <GlobalStyles {...systemValue} />
}

const GlobalStyles = createGlobalStyle<SystemValue>`
  ${styleReset}

  * {
    /* cursor like win95 style */
    cursor: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAh0lEQVRYhe2WSwrAIAxEJ6H3v3K6MaX110WbzCYPRNTFPKOIAGAgoq2nSSgAmBlNwitAk9D7gCGh/US2xCCQLTEVyJRYCmRJbAUyJI7VgogMLgCGya88KjAJla79ziXQwsUlUi+hh0eHLQW68NQqKEg7d3bh1ioQekSv7wAbA/nHVBRFURThnD/uMROGdeAFAAAAAElFTkSuQmCC"), default;
  }

  html {
    font-size: ${({ fontSizeMagnification }) =>
      `${fontSizeMagnification * 16}px`};
  }
  html, body, #root {
    height: 100%;
    font-family: ${(props) =>
      props.vintageFont ? "ms_sans_serif" : "sans-serif"};
  }

  /* createScrollbars */
  ${createScrollbars()}


  body {
    color: ${(props) => props.theme.materialText};
    &:before {
      content: '';
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: black;
      z-index: 9999;
    }
    ${({ scanLines, scanLinesIntensity }) =>
      scanLines &&
      css`
        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 99999;
          opacity: 0.7;
          filter: alpha(opacity=70);
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          background-image: radial-gradient(
              ellipse at center,
              transparent 0,
              transparent 60%,
              rgba(0, 0, 0, ${(0.15 * scanLinesIntensity) / 100}) 100%
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(0, 0, 0, ${(0.35 * scanLinesIntensity) / 100}) 3px
            );
          background-size: 100% 100%, 100% 6px;
          -webkit-animation: flicker 0.3s linear infinite;
          animation: flicker 0.3s linear infinite;
        }
      `}
  }
`

export default GlobalStylesWrapper
