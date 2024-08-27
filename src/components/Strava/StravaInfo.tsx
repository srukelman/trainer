import { useParams } from "react-router-dom";
import { StravaInfoComponent } from "./types";
import { useEffect, useState } from "react";

export const StravaInfo: StravaInfoComponent = ({}) => {
    let { accessToken } = useParams();
    const [athlete, setAthlete] = useState<String>();
    const requestHeaders: Headers = new Headers({
        "Host": 'trainer.seanrkelman.com',
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": 'application/x-www-form-urlencoded'
    });
    useEffect(() => {
        const getData = async () => {
            const payload = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=100", { method: 'GET', headers: requestHeaders });
            const json = await payload.json();
            setAthlete(JSON.stringify(json));
        }
        getData();
    })
    
    return (
        <div>{athlete || 'error'}</div>
    );
};