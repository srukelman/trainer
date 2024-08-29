import { FunctionComponent } from "react"

export interface Activity {
    id: string,
    name: string,
    athlete: { id: string },
    distance: number,
    moving_time: number,
    start_date_local: string,
}

export type StravaProps = { }

export type StravaInfoComponent = FunctionComponent<StravaProps>
export type StravaAuthenticationComponent = FunctionComponent<StravaProps>