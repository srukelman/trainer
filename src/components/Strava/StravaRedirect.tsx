import { useNavigate, useSearchParams } from "react-router-dom";
import { StravaAuthenticationComponent } from "./types";
import { useEffect, useState } from "react";

export const StravaRedirect: StravaAuthenticationComponent = ({}) => {
    const [searchParams, _] = useSearchParams();
    const [accessToken, setAccessToken] = useState('');
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const navigate = useNavigate();
    const uri = `https://www.strava.com/oauth/token?client_id=${import.meta.env.VITE_CLIENT_ID}&client_secret=${import.meta.env.VITE_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`
    useEffect(() => {
        const getData = async () => {
            if (!error && !accessToken){
                try{
                    const response = await fetch(uri, { method: 'POST', cache: 'force-cache' });
                    const json = await response.json();
                    const token = `${json['token_type']}+${json['access_token']}`;
                    setAccessToken(`${json['token_type']}+${json['access_token']}`);
                    console.log(JSON.stringify(json));
                    if (json['token_type']){
                        navigate(`/StravaInfo/${token}`);
                    }
                } catch (err) {
                    console.log(err);
                }   
            }
            if (accessToken){
                
            }
        }
        getData();
        
    }, []);
    
    return (
        <div>
            {error ? <p>Strava Access Was Denied</p>: <><p>{uri}</p>{accessToken}</>}
        </div>
    );
}