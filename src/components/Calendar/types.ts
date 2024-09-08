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
    reps: number,
    distance: number,
    time: number,
    restTime: number,
}

export type Fartlek = {
    time: number,
    restTime: number,
    reps: number,
}

export type Tempo = {
    time: number,
    pace: number,
}

export type WorkoutType = "interval" | "fartlek" | "tempo" | "recovery" | "long run";

export type Workout = {
    id: number,
    type: WorkoutType,
    title: string,
    athlete: string,
    distance: number,
    time: number,
    date: string,
    intervals: Interval[],
    fartleks: Fartlek[],
    tempo: Tempo
}

export type AddWorkoutModalProps = {
    onClose: () => void,
    onSave: (workout: Workout) => void,
    workout: Workout | undefined,
}

export type CalendarComponent = FunctionComponent<CalendarProps>;

export type AddWorkoutModalComponent = FunctionComponent<AddWorkoutModalProps>;