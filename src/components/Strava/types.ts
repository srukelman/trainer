import { FunctionComponent } from "react"

export type StravaProps = { }
export type StravaInfoProps = {
    accessToken: string;
}

export type StravaInfoComponent = FunctionComponent<StravaInfoProps>
export type StravaAuthenticationComponent = FunctionComponent<StravaProps>