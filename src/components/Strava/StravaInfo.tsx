import { useParams } from "react-router-dom";
import { StravaInfoComponent } from "./types";
import { useEffect, useState } from "react";

export const StravaInfo: StravaInfoComponent = ({}) => {
    let { accessToken } = useParams();
    const [athlete, setAthlete] = useState<any>();
    const requestHeaders: Headers = new Headers({
        "Host": 'trainer.seanrkelman.com',
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": 'application/x-www-form-urlencoded'
    });
    useEffect(() => {
        const getData = async () => {
            if (accessToken && !athlete){
                const payload = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=100", { method: 'GET', headers: requestHeaders });
                const json = await payload.json();
                setAthlete(json);
            }
        }
        getData();
    });
    const handleClick = async () => {
        if (athlete){
            const uri = `${import.meta.env.VITE_BACKEND_URL}/activities`;
            const requestHeaders: Headers = new Headers({
                "Content-Type": 'application/x-www-form-urlencoded'
            });
            const requestBody = {
                "id": athlete[1].id.toString(),
                "title": athlete[1].name,
                "athlete": athlete[1].athlete.id.toString(),
                "distance": athlete[1].distance,
                "time": athlete[1].moving_time,
                "date": athlete[1].start_date_local,
            }
            console.log(JSON.stringify(requestBody));
            const response = await fetch(uri, { method: 'POST', headers: requestHeaders, body: JSON.stringify(requestBody) });
            const json = await response.json();
            console.log(json);
        }
    }
    
    return (
        <div>
            {JSON.stringify(athlete && athlete[0]) || 'error'}
            <button onClick={handleClick}>Upload Data To Backend</button>
        </div>
    );
};