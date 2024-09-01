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

export type Interval = {
    id: number,
    title: string,
    distance: number,
    time: number,
    restTime: number,
    type: string,
}

export type Workout = {
    id: number,
    title: string,
    athlete: string,
    distance: number,
    time: number,
    date: string,
    type: string,
    intervals: Interval[],
}

export type CalendarComponent = FunctionComponent<CalendarProps>;