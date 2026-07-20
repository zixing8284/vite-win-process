import { Select } from "react95"
import { Paragraph } from "../../Window/CommonStyle"
import { SystemValue } from "@/contexts/system/types"
import styled from "styled-components"

const backgroundRepeat = [
  {
    label: "no-repeat",
    value: "no-repeat",
  },
  {
    label: "repeat",
    value: "repeat",
  },
]
const backgroundSize = [
  {
    label: "auto",
    value: "auto auto",
  },
  {
    label: "cover",
    value: "cover",
  },
  {
    label: "contain",
    value: "contain",
  },
  {
    label: "拉伸",
    value: "100% 100%",
  },
]

const backgroundPosition = [
  {
    label: "center",
    value: "center",
  },
  {
    label: "left",
    value: "left",
  },
  {
    label: "right",
    value: "right",
  },
  {
    label: "top",
    value: "top",
  },
  {
    label: "bottom",
    value: "bottom",
  },
]

type BackgroundSizeProps = {
  systemValue: SystemValue
  onChange: (key: keyof SystemValue, value: string | number) => void
}

const Wrapper = styled.div`
  ${Paragraph} {
    margin-block-end: 0rem;
  }
`

const BackgroundProperty = ({ systemValue, onChange }: BackgroundSizeProps) => {
  return (
    <>
      <Wrapper>
        <Paragraph>Repeat:</Paragraph>
        <Select
          options={backgroundRepeat}
          value={systemValue["backgroundRepeat"]}
          menuMaxHeight={160}
          width={160}
          onChange={(e) => onChange("backgroundRepeat", e.value)}
        />

        <Paragraph>Size:</Paragraph>
        <Select
          options={backgroundSize}
          value={systemValue["backgroundSize"]}
          menuMaxHeight={160}
          width={160}
          onChange={(e) => onChange("backgroundSize", e.value)}
        />

        <Paragraph>Position:</Paragraph>
        <Select
          options={backgroundPosition}
          value={systemValue["backgroundPosition"]}
          menuMaxHeight={160}
          width={160}
          onChange={(e) => onChange("backgroundPosition", e.value)}
        />
      </Wrapper>
    </>
  )
}

export default BackgroundProperty
