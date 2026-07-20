import styled from "styled-components"

const ProgressContainer = styled.div`
  background: white;
  height: 14px;
  margin: 1rem 0.5rem;
  border-style: solid;
  border-width: 2px;
  border-top-color: ${({ theme }) => theme.borderDark};
  border-left-color: ${({ theme }) => theme.borderDark};
  border-bottom-color: ${({ theme }) => theme.borderLightest};
  border-right-color: ${({ theme }) => theme.borderLightest};
  box-sizing: border-box;
`

const WhiteBar = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  touch-action: none;
`

interface LeftCutoutProps {
  progress: number
}

const LeftCutout = styled.div.attrs<LeftCutoutProps>((props) => ({
  style: {
    inset: `0 ${100 - props.progress}% 0 0`,
  },
}))<LeftCutoutProps>`
  position: absolute;
`

const HandleWrapper = styled.div.attrs<LeftCutoutProps>((props) => ({
  style: {
    left: `${props.progress}%`,
  },
}))<LeftCutoutProps>`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
`

const Handle = styled.div`
  position: relative;
  top: 1px;
  & > div:first-child {
    width: 12px;
    height: 18px;
    border-style: solid;
    border-width: 2px 2px 0 2px;
    background-color: ${({ theme }) => theme.material};
    border-top-color: ${({ theme }) => theme.borderLightest};
    border-left-color: ${({ theme }) => theme.borderLightest};
    border-right-color: ${({ theme }) => theme.borderDark};
    box-sizing: border-box;
  }
  & > div:last-child {
    width: 8px;
    height: 8px;
    border-style: solid;
    border-width: 0 0 2px 2px;
    background-color: ${({ theme }) => theme.material};
    border-left-color: ${({ theme }) => theme.borderLightest};
    border-bottom-color: ${({ theme }) => theme.borderDark};
    box-sizing: border-box;
    transform: rotate(-45deg) translateX(-50%);
    position: relative;
    left: 5px;
    top: -7px;
    box-sizing: border-box;
  }
`

type ProgressBarProps = {
  progress: number
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
  handleMouseUp: (e: React.MouseEvent<HTMLDivElement>) => void
}

const ProgressBar = ({
  progress,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
}: ProgressBarProps) => {
  return (
    <div>
      <ProgressContainer>
        <WhiteBar
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <LeftCutout progress={progress} />
          <HandleWrapper progress={progress}>
            <Handle>
              <div />
              <div />
            </Handle>
          </HandleWrapper>
        </WhiteBar>
      </ProgressContainer>
    </div>
  )
}

export default ProgressBar
