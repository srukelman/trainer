import { CalendarComponent, Activity, CalendarState } from "./types"
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useUnitStore } from "../../stores/SettingsStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

export const Calendar: CalendarComponent = ({
    currentDay,
}) => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [state, setState] = useState<CalendarState>({currentDay: currentDay || new Date(), weekOf: new Date()});
    const atheleteId = "48566990";
    const unitStore = useUnitStore();
    const [activities, setActivities] = useState<Activity[]>([])
    useEffect(() => {
        state.weekOf.setDate(state.weekOf.getDate() - state.weekOf.getDay());
        const getData = async () => {
            const uri = `${import.meta.env.VITE_BACKEND_URL}/activities/athlete/${atheleteId}`;
            const requestHeaders: Headers = new Headers({
                "Content-Type": 'application/x-www-form-urlencoded'
            });
            const response = await fetch(uri, { method: 'GET', headers: requestHeaders });
            const json = await response.json();
            setActivities(json);
        }
        getData();
    }, [unitStore, state]);
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
    const incrementWeek = () => {
        const newDate = new Date(state.weekOf);
        newDate.setDate(newDate.getDate() + 7);
        setState({...state, weekOf: newDate});
    }
    const decrementWeek = () => {
        const newDate = new Date(state.weekOf);
        newDate.setDate(newDate.getDate() - 7);
        setState({...state, weekOf: newDate});
    }
    return (
        <div>
            <div>
                <button onClick={decrementWeek}><FontAwesomeIcon icon={faAngleDoubleLeft} /></button>
                <button></button>
                <button onClick={incrementWeek}><FontAwesomeIcon icon={faAngleDoubleRight} /></button>
            </div>
            <table>
                <thead>
                    <tr>
                        {weekdays.map((value, index) => {
                            const day = new Date(state.weekOf);
                            day.setDate(day.getDate() + index);
                            return (
                                <th
                                key={(day.getMonth(), day.getDate())}
                                className={classNames("CalendarTable--header", {
                                    "CalendarTable--header-today": day.getMonth() == state.currentDay.getMonth() && day.getDate() == state.currentDay.getDate() && day.getFullYear() == state.currentDay.getFullYear()
                                })}
                                >
                                    {value} {months[day.getMonth()]} {day.getDate()}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {weekdays.map((_, index) => {
                            const day = new Date(state.weekOf);
                            day.setDate(day.getDate() + index);
                            return (
                                <td
                                key={(state.currentDay.getMonth(), index + state.weekOf.getDate())}
                                className={classNames("CalendarTable--data", {
                                    "CalendarTable--data-today": day.getMonth() == state.currentDay.getMonth() && day.getDate() == state.currentDay.getDate() && day.getFullYear() == state.currentDay.getFullYear()
                                })}
                                >
                                    Workout Planned:
                                </td>
                            );
                        })}
                    </tr>
                    <tr>
                        {weekdays.map((_, index) => {
                            const day = new Date(state.weekOf);
                            day.setDate(day.getDate() + index);
                            return (
                                <td
                                key={(day.getMonth(), day.getDay() + day.getDate())}
                                className={classNames("CalendarTable--data", {
                                    "CalendarTable--data-today": day.getMonth() == state.currentDay.getMonth() && day.getDate() == state.currentDay.getDate() && day.getFullYear() == state.currentDay.getFullYear()
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

