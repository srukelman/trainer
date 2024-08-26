import { StravaAuthenticationComponent } from "./types";

export const StravaAuthenticate: StravaAuthenticationComponent = ({}) => {
    const handleClick = () => {
        if (import.meta.env.VITE_NODE_ENV == 'development') {
            window.location.href = `http://www.strava.com/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&approval_prompt=force&scope=activity:read_all`
        }
        else {
            window.location.href = `http://www.strava.com/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}&response_type=code&redirect_uri=${import.meta.env.VITE_PROD_REDIRECT_URI}&approval_prompt=force&scope=activity:read_all`
        }
        
    }
    return (
        <div>
            <button onClick={handleClick}>Login With Strava</button>
        </div>
    );
}