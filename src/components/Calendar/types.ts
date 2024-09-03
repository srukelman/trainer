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
    distance: number,
    time: number,
    restTime: number,
}

export type Fartlek = {
    distance: number,
    time: number,
    restTime: number,
}

export type Tempo = {
    time: number,
    pace: number,
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
    fartleks: Fartlek[],
    tempo: Tempo
}

export type AddWorkoutModalProps = {
    onClose: () => void,
    onSave: (workout: Workout) => void,
    date: Date,
}

export type CalendarComponent = FunctionComponent<CalendarProps>;

export type AddWorkoutModalComponent = FunctionComponent<AddWorkoutModalProps>;