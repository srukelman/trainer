import { useParams } from "react-router-dom";
import { StravaInfoComponent } from "./types";
import { useEffect, useState } from "react";
import { Activity } from "../Strava/types";

export const StravaInfo: StravaInfoComponent = ({}) => {
    let { accessToken } = useParams();
    const [athlete, setAthlete] = useState<any>();
    const requestHeaders: Headers = new Headers({
        "Host": 'trainer.seanrkelman.com',
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": 'application/x-www-form-urlencoded'
    });
    useEffect(() => {
        
        const getAthleteId = async () => {
            if (accessToken){
                const payload = await fetch("https://www.strava.com/api/v3/athlete", { method: 'GET', headers: requestHeaders });
                const json = await payload.json();
                const athleteId = json.id;
                return athleteId;
            }
            return '';
        }
        const getMostRecentActivity = async (athleteId: string) => {
            if (athleteId){
                const backendHeaders = new Headers({
                    "content-type": 'application/x-www-form-urlencoded'
                });
                const payload = await fetch(`${import.meta.env.VITE_BACKEND_URL}/activities/most-recent/${athleteId}`, { method: 'GET', headers: backendHeaders });
                if (payload.status == 200) {
                    const json = await payload.json();
                    const date = new Date(json.date);
                    return date.getTime()/1000;
                } else {
                    const date = new Date();
                    date.setMonth(date.getMonth() - 2);
                    return date.getTime()/1000;
                }
            }
            return 0;
        }
        const getData = async () => {
            const afterDate = await getMostRecentActivity(await getAthleteId());
            if (accessToken && !athlete){
                const payload = await fetch(`https://www.strava.com/api/v3/athlete/activities?after=${afterDate}`, { method: 'GET', headers: requestHeaders });
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
            athlete.forEach(async (activity: Activity) => {
                const requestBody = {
                    "id": activity.id.toString(),
                    "title": activity.name,
                    "athlete": activity.athlete.id.toString(),
                    "distance": activity.distance,
                    "time": activity.moving_time,
                    "date": activity.start_date_local,
                }
                const response = await fetch(uri, { method: 'POST', headers: requestHeaders, body: JSON.stringify(requestBody) });
                await response.json();
            });
        }
    }
    
    return (
        <div>
            {athlete ? 'data from strava gathered successfully' : 'error'}
            <button onClick={handleClick}>Upload Data To Backend</button>
        </div>
    );
};