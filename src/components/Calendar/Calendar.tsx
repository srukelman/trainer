import { CalendarComponent, Activity, CalendarState, Workout } from "./types"
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useUnitStore } from "../../stores/SettingsStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { AddWorkoutModal } from "./AddWorkoutModal";

export const Calendar: CalendarComponent = ({
    currentDay,
}) => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [state, setState] = useState<CalendarState>({currentDay: currentDay || new Date(), weekOf: new Date()});
    const atheleteId = "48566990";
    const unitStore = useUnitStore();
    const [activities, setActivities] = useState<Activity[]>([])
    const [workouts, setWorkouts] = useState<Workout[]>([])
    const [showAddWorkout, setShowAddWorkout] = useState<boolean>(false);
    const [addWorkoutDate, setAddWorkoutDate] = useState<Date>(new Date());
    useEffect(() => {
        state.weekOf.setDate(state.weekOf.getDate() - state.weekOf.getDay());
        const getActivityData = async () => {
            const uri = `${import.meta.env.VITE_BACKEND_URL}/activities/athlete/${atheleteId}`;
            const requestHeaders: Headers = new Headers({
                "Content-Type": 'application/x-www-form-urlencoded'
            });
            const response = await fetch(uri, { method: 'GET', headers: requestHeaders });
            const json = await response.json();
            setActivities(json);
        }
        const getWorkoutData = async () => {
            const uri = `${import.meta.env.VITE_BACKEND_URL}/workouts/athlete/${atheleteId}`;
            const requestHeaders: Headers = new Headers({
                "Content-Type": 'application/x-www-form-urlencoded'
            });
            const response = await fetch(uri, { method: 'GET', headers: requestHeaders });
            const json = await response.json();
            setWorkouts(json);
        }
        getActivityData();
        getWorkoutData();
    }, [unitStore, state]);

    const formatTime = (time: number) => {
        const seconds = time % 60;
        const minutes = Math.floor(time / 60);
        if (minutes < 60) {
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        const hours = Math.floor(minutes / 60);
        const newMinutes = minutes % 60;
        return `${hours}:${newMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

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
                <p>{formatTime(activity.time)} seconds</p>
            </div>
        )
    }

    const formatWorkout = (workout: Workout, day: Date) => {
        if (!workout) return (
            <>
                <p>No Workout Planned</p>
                <button onClick={() => {
                    setShowAddWorkout(true);
                    setAddWorkoutDate(day);
                }}>Add Workout</button>
            </>
        )
        let distance: number;
        let distanceUnit;
        if (useUnitStore.getState().setting == 'imperial') {
            distance = workout.distance * 0.000621371;
            distanceUnit = 'miles';
        }
        else {
            distance = workout.distance * 0.001;
            distanceUnit = 'kilometers';
        }
        distance = Math.round(distance * 100) / 100
        return (
            <div>
                <p>{workout.title}</p>
                <p>{distance} {distanceUnit}</p>
                <p>{formatTime(workout.time)} seconds</p>
                <button>Edit Workout</button>
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

    const handleWeekOfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const temp = new Date(event.target.value);
        const newDate = new Date(temp.getTime() + temp.getTimezoneOffset() * 60000);
        setState({...state, weekOf: newDate});
    }
    return (
        <div>
            <div>
                <button onClick={decrementWeek}><FontAwesomeIcon icon={faAngleDoubleLeft} /></button>
                <input type='date' id='current-week' value={state.weekOf.toISOString().split('T')[0]} onChange={handleWeekOfChange}/>
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
                                    {formatWorkout(workouts.filter(function(item) { return item.date.split('T')[0] == day.toISOString().split('T')[0] })[0], day)}
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
            {showAddWorkout && createPortal(
                <AddWorkoutModal onClose={() => setShowAddWorkout(false)} onSave={(workout) => {console.log(workout)}} date={addWorkoutDate} />,
                document.getElementById('root')!
            )}
        </div>
    )
}

