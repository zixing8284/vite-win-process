import hourGlass from "./hourglass.gif"
import styled from "styled-components"

const Hourglass = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 99999;
`

const Loading = () => <Hourglass src={hourGlass} />

export default Loading
