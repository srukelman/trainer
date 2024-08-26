import { useParams } from "react-router-dom";
import { StravaInfoComponent } from "./types";
import { useEffect, useState } from "react";

export const StravaInfo: StravaInfoComponent = ({}) => {
    let { accessToken } = useParams();
    const [athlete, _] = useState<FormData>();
    const requestHeaders: Headers = new Headers({
        "Host": 'localhost',
        "Authorization": `${accessToken?.split('+').join(' ')}`,
        "Content-Type": 'application/x-www-form-urlencoded'
    });
    useEffect(() => {
        const getData = async () => {
            const payload = await fetch("https://www.strava.com/api/v3/athlete/activities?before=&after=&page=&per_page=", { method: 'GET', headers: requestHeaders });
            const json = await payload.json();
            console.log(JSON.stringify(json));
        }
        getData();
    })
    
    return (
        <div>{athlete?.entries() || 'kill yourself'}</div>
    );
};