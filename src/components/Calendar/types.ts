import { FunctionComponent } from "react"

export type CalendarProps = { currentDay: Date | null }
export type CalendarState = {
    currentDay: Date,
    weekOf: Date,
}

export type Activity = {
    id: string,
    title: string,
    athlete: string,
    distance: number,
    time: number,
    date: string,
}

export type CalendarComponent = FunctionComponent<CalendarProps>;