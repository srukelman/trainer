import { FunctionComponent } from "react"

export type CalendarProps = { currentDay: Date | null }
export type CalendarState = { currentDay: Date }

export type CalendarComponent = FunctionComponent<CalendarProps>;