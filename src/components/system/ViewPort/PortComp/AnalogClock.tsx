/*
Credits for the SVG base
  https://codepen.io/john555/pen/odxzVv
  https://medium.com/the-andela-way/create-a-pure-css-clock-with-svg-f123bcc41e46
*/
import * as React from "react"
import styled, { css } from "styled-components"

import useAnalogClock from "./useAnalogClock"

interface StyleProps {
  hours: number
  minutes: number
  size: string
  marks: boolean
  numbers: boolean
}
type ICounterProps = {
  className?: string
  hours?: number
  minutes?: number
  marks?: boolean
  numbers?: boolean
  size?: string
}

const heavyRotation = (i: number) => css`
  transform: rotate(${i * 30}deg);
`

const SVG = styled.svg`
  height: ${(props: StyleProps) => props.size};
  width: 200px;
  height: 200px;
  user-select: none;
  fill: none;
  stroke: #000;
  stroke-width: 1;
  stroke-linecap: round;
  transform: rotate(-90deg);
  --start-minutes: 0;
  --start-hours: 11;
  --display--marks: ${(props: StyleProps) => (props.marks ? "block" : "none")};
  --display--numbers: ${(props: StyleProps) =>
    props.numbers ? "block" : "none"};

  circle {
    fill: white;
  }

  .marks {
    transform: translate(20px, 20px);
    stroke-width: 0.2;
  }

  .minute,
  .hour {
    transform: translate(20px, 20px) rotate(0deg);
    transition: transform 1s;
  }

  .minute {
    transform: translate(20px, 20px)
      rotate(${(props: StyleProps) => 360 * props.hours + props.minutes * 6}deg);
    stroke-width: 0.6;
  }

  .hour {
    transform: translate(20px, 20px)
      rotate(
        ${(props: StyleProps) => props.hours * 30 + props.minutes * 0.5}deg
      );
    stroke-width: 1;
  }

  .tiaText {
    font-size: 1px;
    transform: translate(14px, 19px) rotate(90deg);
    fill: #dfdfdf;
    stroke: none;
  }

  .numbers {
    display: var(--display--numbers);
    transform: translate(20px, 20px) rotate(90deg);
  }

  .numbers text {
    text-anchor: middle;
    font-size: 3px;
    fill: black;
    stroke: none;
    transform: translate(0, -15px);
  }

  .pin {
    stroke: black;
    stroke-width: 0.2;
  }

  ${Array.from({ length: 12 }).map(
    (_, i) =>
      css`
        .numbers > g:nth-child(${i + 1}),
        .marks > line:nth-child(${i + 1}) {
          ${heavyRotation(i)};
        }
      `,
  )}
`

const AnalogClock: React.FC<ICounterProps> = ({
  className = "",
  marks = true,
  numbers = false,
  size = "100vh",
}) => {
  const { hours, minutes } = useAnalogClock()
  return (
    <SVG
      viewBox="0 0 40 40"
      className={className}
      hours={hours}
      minutes={minutes}
      marks={marks}
      numbers={numbers}
      size={size}
    >
      <circle cx="20" cy="20" r="19" />
      <g className="marks">
        {[...Array(12)].map((_, index) => (
          <line x1="15" y1="0" x2="16" y2="0" key={index} />
        ))}
      </g>
      <g className="numbers">
        {[...Array(12)].map((_, index) => (
          <g key={index}>
            <text x="0" y="0">
              {index + 1}
            </text>
          </g>
        ))}
      </g>
      <text x="0" y="0" className="tiaText">
        time flies
      </text>
      <line x1="0" y1="0" x2="9" y2="0" className="hour" />
      <line x1="0" y1="0" x2="13" y2="0" className="minute" />
      <circle cx="20" cy="20" r="0.7" className="pin" />
    </SVG>
  )
}

export default AnalogClock
