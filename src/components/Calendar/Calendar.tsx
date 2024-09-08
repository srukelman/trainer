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
    const [addWorkout, setAddWorkout] = useState<Workout>();
    const [addWorkoutDay, setAddWorkoutDay] = useState<Date>(new Date());
    const [key, setKey] = useState<number>(0);
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
    }, [unitStore, state, key]);

    const formatTime = (time: number) => {
        const seconds = time % 60;
        const minutes = Math.floor(time / 60);
        if (minutes == 0) {
            return `${seconds.toString().padStart(2, '0')}s`;
        }
        if (minutes < 60) {
            return `${minutes}m ${seconds.toString().padStart(2, '0')}s`;
        }
        const hours = Math.floor(minutes / 60);
        const newMinutes = minutes % 60;
        return `${hours}h ${newMinutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
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
                <p>{formatTime(activity.time)}</p>
            </div>
        )
    }

    const formatWorkout = (workout: Workout, day: Date) => {
        if (!workout) return (
            <>
                <p>No Workout Planned</p>
                <button onClick={() => {
                    setShowAddWorkout(true);
                    setAddWorkout(workout);
                    setAddWorkoutDay(new Date(day.getTime() + day.getTimezoneOffset() * 60000));
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
                <p>{formatTime(workout.time)}</p>
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

    const sendWorkout = async (workout: Workout) => {
        const uri = `${import.meta.env.VITE_BACKEND_URL}/workouts`;
        const requestHeaders: Headers = new Headers({
            "Content-Type": 'application/json'
        });
        workout = {...workout, date: addWorkoutDay.toISOString(), title: "New Workout", athlete: atheleteId };
        const body = JSON.stringify(workout);
        const response = await fetch(uri, { method: 'POST', headers: requestHeaders, body });
        await response.json();
        setKey(key + 1);
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
                                    {formatWorkout(workouts.filter((item) => {
                                            const date = new Date(Date.parse(item.date));
                                            return date.getMonth() == day.getMonth() && date.getDate() == day.getDate() && date.getFullYear() == day.getFullYear();
                                        })[0], day)
                                    }
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
                                    {formatActivity(activities.filter((item)  => {
                                            const date = new Date(Date.parse(item.date));
                                            return date.getMonth() == day.getMonth() && date.getDate() == day.getDate() && date.getFullYear() == day.getFullYear();
                                        })[0])}
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>
            {showAddWorkout && createPortal(
                <AddWorkoutModal
                    onClose={() => setShowAddWorkout(false)}
                    onSave={(workout) => {
                        sendWorkout(workout)
                        setShowAddWorkout(false);
                    }}
                    workout={addWorkout} />,
                document.getElementById('root')!
            )}
        </div>
    )
}

