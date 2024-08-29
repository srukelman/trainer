import { CalendarComponent, Activity } from "./types"
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useUnitStore } from "../../stores/SettingsStore";

export const Calendar: CalendarComponent = ({
    currentDay,
}) => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [state, _] = useState({currentDay: currentDay || new Date()});
    const atheleteId = "48566990";
    const unitStore = useUnitStore();
    const [activities, setActivities] = useState<Activity[]>([])
    useEffect(() => {
        const getData = async () => {
            const uri = `${import.meta.env.VITE_BACKEND_URL}/activities/athlete/${atheleteId}`;
            const requestHeaders: Headers = new Headers({
                "Content-Type": 'application/x-www-form-urlencoded'
            });
            const response = await fetch(uri, { method: 'GET', headers: requestHeaders });
            const json = await response.json();
            setActivities(json);
            console.log(JSON.stringify(json));
        }
        getData();
    }, [unitStore]);
    const formatActivity = (activity: Activity) => {
        if (!activity) return <p>No Activity</p>
        let distance: number;
        let distanceUnit;
        if (useUnitStore.getState().setting == 'imperial') {
            distance = activity.distance * 0.000621371;
            distanceUnit = 'miles';
        }
        else {
            distance = activity.distance * 0.001;
            distanceUnit = 'kilometers';
        }
        distance = Math.round(distance * 100) / 100
        return (
            <div>
                <p>{activity.title}</p>
                <p>{distance} {distanceUnit}</p>
                <p>{activity.time} seconds</p>
            </div>
        )
    }
    return (
        <div>

            <table>
                <thead>
                    <tr>
                        {weekdays.map((value, index) => {
                            return (
                                <th
                                key={(state.currentDay.getMonth(), index - state.currentDay.getDay() + state.currentDay.getDate())}
                                className={classNames("CalendarTable--header", {
                                    "CalendarTable--header-today": index == state.currentDay.getDay()
                                })}
                                >
                                    {value} {months[state.currentDay.getMonth()]} {index - state.currentDay.getDay() + state.currentDay.getDate()}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {weekdays.map((_, index) => {
                            return (
                                <td
                                key={(state.currentDay.getMonth(), index - state.currentDay.getDay() + state.currentDay.getDate())}
                                className={classNames("CalendarTable--data", {
                                    "CalendarTable--data-today": index == state.currentDay.getDay()
                                })}
                                >
                                    Workout Planned:
                                </td>
                            );
                        })}
                    </tr>
                    <tr>
                        {weekdays.map((_, index) => {
                            const day = new Date(Number(state.currentDay) - (state.currentDay.getDay() - index) * 24 * 60 * 60 * 1000);
                            return (
                                <td
                                key={(day.getMonth(), day.getDay() + day.getDate())}
                                className={classNames("CalendarTable--data", {
                                    "CalendarTable--data-today": index == state.currentDay.getDay()
                                })}
                                >
                                    Workout Completed:
                                    {formatActivity(activities.filter(function(item) { return item.date.split('T')[0] == day.toISOString().split('T')[0] })[0])}
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

