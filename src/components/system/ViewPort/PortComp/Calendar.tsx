import { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import {
  Select,
  NumberInput,
  ScrollView,
  NumberInputProps,
  WindowContent,
  GroupBox,
  Toolbar,
} from "react95"
import { SelectOption } from "react95/dist/Select/Select.types"
import { Details } from "../../Window/CommonStyle"

import AnalogClock from "./AnalogClock"
import useClock from "@/hooks/useClock"

type CalendarProps = {
  date?: Date
}
const convertDateToState = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  }
}

const timeZoneOptions = [
  { value: 0, label: "UTC+8 (Beijing, Hong Kong, Singapore)" },
  { value: 1, label: "UTC+9 (Tokyo, Seoul)" },
  { value: 2, label: "UTC+1 (Berlin, Paris, Rome)" },
  { value: 3, label: "UTC-5 (New York, Washington, Atlanta)" },
  { value: 4, label: "UTC-8 (Los Angeles, San Francisco)" },
]

const months = [
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" },
]

// The month as a number between 0 and 11
const daysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate() // get the last day of the month , if month+1 is 10, it will return 31, 2023/10
}

const dayInWeekIndex = (day: number, month: number, year: number) => {
  return new Date(year, month, day).getDay() // get the day of the week, (2023, 9, 3)  2023/10/3 is Tuesday, it will return 2
}

const CalendarContainer = styled(ScrollView)`
  margin: 1rem 0;
  width: 234px;
  background: ${({ theme }) => theme.canvas};
  user-select: none;
  flex: 1 1 0%;
`

const WeekDays = styled.div`
  display: flex;
  background: ${({ theme }) => theme.materialDark};
  color: #dfe0e3;
`

const Dates = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const DateItem = styled.div`
  text-align: center;
  height: 1.5em;
  line-height: 1.5em;
  width: 14.28%;
`

const GroupBoxStyled = styled(GroupBox)`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const DateItemContent = styled.span<{ active?: boolean }>`
  cursor: pointer;
  box-sizing: border-box;
  border: 2px solid transparent;
  background: ${({ active, theme }) =>
    active ? theme.hoverBackground : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.canvasTextInvert : theme.canvasText};

  &:hover {
    border: 2px dashed
      ${({ theme, active }) => (active ? "none" : theme.materialDark)};
  }
`

const DateTimeErea = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`

// React95 NumberInput doesn't have name and id props, so we need to set it manually
const NumberInputStyled = ({
  name,
  id,
  ...props
}: {
  name: string
  id?: string
} & NumberInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    id && inputRef && inputRef.current?.setAttribute("id", id)
    inputRef && inputRef.current?.setAttribute("name", name)
  }, [name, id])

  return <NumberInput {...props} ref={inputRef} />
}

const Calendar = ({ date = new Date() }: CalendarProps) => {
  const { date: clockDate } = useClock()

  const initialDate = convertDateToState(date || new Date())

  const [selectedDate, setSelectedDate] = useState(initialDate)

  const dayPickerItems = [...Array(42)]

  const monthfirstDayInWeek = dayInWeekIndex(
    1,
    selectedDate.month,
    selectedDate.year,
  )

  const daysLength = daysInMonth(selectedDate.month, selectedDate.year)

  const dateItems = dayPickerItems.map((_, index) => {
    // if index is between monthfirstDayInWeek and monthfirstDayInWeek + daysLength, it will be filled with date number
    if (
      index >= monthfirstDayInWeek &&
      index < monthfirstDayInWeek + daysLength
    ) {
      const dateNumber = index - monthfirstDayInWeek + 1
      return (
        <DateItem key={index}>
          <DateItemContent
            active={
              selectedDate.year === initialDate.year &&
              selectedDate.month === initialDate.month &&
              dateNumber === selectedDate.date
            }
          >
            {dateNumber}
          </DateItemContent>
        </DateItem>
      )
      // else it will be filled with empty
    } else {
      return <DateItem key={index} />
    }
  })

  const handleMonthSelect = (e: SelectOption<number>) => {
    setSelectedDate({
      ...selectedDate,
      month: e.value,
    })
  }
  const handleYearSelect = (value: number) => {
    setSelectedDate({
      ...selectedDate,
      year: value,
    })
  }

  return (
    <>
      <WindowContent>
        <DateTimeErea>
          <GroupBoxStyled
            label={
              <>
                <u>D</u>ate
              </>
            }
          >
            <Toolbar noPadding style={{ justifyContent: "space-between" }}>
              <Select
                options={months}
                value={selectedDate.month}
                onChange={handleMonthSelect}
                menuMaxHeight={200}
                width={128}
                name="month"
              />
              <NumberInputStyled
                value={
                  selectedDate.year < 1000
                    ? Number(`0${selectedDate.year}`)
                    : selectedDate.year
                }
                width={100}
                onChange={handleYearSelect}
                name="year"
                id="year"
              />
            </Toolbar>
            <CalendarContainer>
              <WeekDays>
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <DateItem key={index}>{day}</DateItem>
                ))}
              </WeekDays>
              <Dates>{dateItems}</Dates>
            </CalendarContainer>
          </GroupBoxStyled>
          <GroupBoxStyled
            label={
              <>
                <u>T</u>
                ime
              </>
            }
          >
            <AnalogClock />
            <Details variant="field">{clockDate}</Details>
          </GroupBoxStyled>
        </DateTimeErea>
        <GroupBoxStyled
          label={
            <>
              <u>T</u>
              ime Zone
            </>
          }
        >
          <Select
            defaultValue={0}
            options={timeZoneOptions}
            width={"100%"}
            menuMaxHeight={160}
            readOnly
          />
        </GroupBoxStyled>
      </WindowContent>
    </>
  )
}

export default Calendar
