import { useNavigate, useSearchParams } from "react-router-dom";
import { StravaAuthenticationComponent } from "./types";
import { useEffect } from "react";
import { get } from "http";


export const StravaRedirect: StravaAuthenticationComponent = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get('code');
    const uri = `https://www.strava.com/oauth/token?client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`
    useEffect(() => {
        const getData = async () => {
            const response = await fetch(uri, { method: 'POST' });
            const json = await response.json;
            console.log(json.toString());
        }
        getData();
    })
    
    return (
        <div></div>
    );
}