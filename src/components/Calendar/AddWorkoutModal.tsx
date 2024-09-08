import { useEffect, useState } from "react";
import { AddWorkoutModalComponent, Workout, Interval, WorkoutType, Fartlek } from "./types";

export const AddWorkoutModal: AddWorkoutModalComponent = ({
    onClose,
    onSave,
    workout,
}) => {
    const [resultWorkout, setWorkout] = useState<Workout>(workout || {
        id: 0,
        type: "recovery",
        title: "",
        athlete: "",
        distance: 0,
        time: 0,
        date: "",
        intervals: [],
        fartleks: [],
        tempo: {
            time: 0,
            pace: 0,
        }
    });

    const [newInterval, setNewInterval] = useState<Interval>({
        reps: 0,
        distance: 0,
        time: 0,
        restTime: 0,
    });
    const [newFartlek, setNewFartlek] = useState<Fartlek>({
        reps: 0,
        time: 0,
        restTime: 0,
    });
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)  =>{
        const { name, value } = event.target;
        setWorkout({
            ...resultWorkout,
            [name]: value,
        });
    }

    const handleIntervalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewInterval({
            ...newInterval,
            [name]: parseInt(value),
        });
    };

    const handleFartlekInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewFartlek({
            ...newFartlek,
            [name]: parseInt(value),
        });
    }

    useEffect(() => {
        console.log(resultWorkout.intervals);
    }, [resultWorkout]);

    const handleAddSet = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newInterval.reps === 0 || newInterval.distance === 0 || newInterval.time === 0 || newInterval.restTime === 0) {
            setError(true);
            setErrorMessage("All fields are required");
            return;
        }
        const newIntervals = [...resultWorkout.intervals, newInterval];
        setWorkout({...resultWorkout, intervals: newIntervals});
        setNewInterval({
            reps: 0,
            distance: 0,
            time: 0,
            restTime: 0,
        });

    }

    const handleAddFartlek = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (newFartlek.reps == 0 || newFartlek.time == 0 || newFartlek.restTime == 0) {
            setError(true);
            setErrorMessage("All fields are required");
            return;
        }
        const newFartleks = [...resultWorkout.fartleks, newFartlek];
        setWorkout({...resultWorkout, fartleks: newFartleks});
        setNewFartlek({
            reps: 0,
            time: 0,
            restTime: 0,
        });
    }

    const formSwitch = () => {
        switch (resultWorkout.type) {
            case "recovery":
                return (
                    <div className="subForm">
                        <label htmlFor="distance">Distance</label>
                        <input type="number" id="distance" name="distance" value={resultWorkout.distance} onChange={handleChange} />
                        <label htmlFor="time">Time</label>
                        <input type="number" id="time" name="time" value={resultWorkout.time} onChange={handleChange}/>
                    </div>
                );
            case "long run":
                return (
                    <div className="subForm">
                        <label htmlFor="distance">Distance</label>
                        <input type="number" id="distance" name="distance" value={resultWorkout.distance} onChange={handleChange} />
                        <label htmlFor="time">Time</label>
                        <input type="number" id="time" name="time" value={resultWorkout.time} onChange={handleChange}/>
                    </div>
                );
            case "interval":
                return (
                    <div className="subForm">
                        <label htmlFor="totalDistance">Total Distance</label>
                        <input type="number" id="totalDistance" name="distance" value={resultWorkout.distance} onChange={handleChange} />
                        <label htmlFor="totalTime">Total Time</label>
                        <input type="number" id="totalTime" name="time" value={resultWorkout.time} onChange={handleChange}/>
                        <table>
                            {resultWorkout.intervals.length > 0 &&
                                <tr>
                                    <th>Set</th>
                                    <th>Reps</th>
                                    <th>Distance</th>
                                    <th>Time</th>
                                    <th>Rest Time</th>
                                </tr>
                            }
                            {resultWorkout.intervals.map((interval, index) => {
                                return (
                                    <tr key={index}>
                                        <td>Set {index + 1}</td>
                                        <td>{interval.reps}</td>
                                        <td id="distance">{interval.distance}</td>
                                        <td id="time">{interval.time}</td>
                                        <td id="rest-time">{interval.restTime}</td>
                                    </tr>
                                );
                            })}
                        </table>
                        <div className="interval-add-form">
                            <input type="number" id="reps" name="reps" value={newInterval.reps} onChange={handleIntervalInputChange}/>
                            <input type="number" id="distance" name="distance" value={newInterval.distance} onChange={handleIntervalInputChange} />
                            <input type="number" id="time" name="time" value={newInterval.time} onChange={handleIntervalInputChange} />
                            <input type="number" id="restTime" name="restTime" value={newInterval.restTime} onChange={handleIntervalInputChange} />
                            {error && <p className="error-text">{errorMessage}</p>}
                            <button onClick={handleAddSet}>Add Set</button>

                        </div>
                    </div>
                );
            case "tempo":
                return (
                    <div className="subForm">
                        <label htmlFor="totalDistance">Total Distance</label>
                        <input type="number" id="totalDistance" name="distance" value={resultWorkout.distance} onChange={handleChange} />
                        <label htmlFor="totalTime">Total Time</label>
                        <input type="number" id="totalTime" name="time" value={resultWorkout.time} onChange={handleChange}/>
                    </div>
                );
            case "fartlek":
                return (
                    <div className="subForm">
                        <label htmlFor="totalDistance">Total Distance</label>
                        <input type="number" id="totalDistance" name="distance" value={resultWorkout.distance} onChange={handleChange} />
                        <label htmlFor="totalTime">Total Time</label>
                        <input type="number" id="totalTime" name="time" value={resultWorkout.time} onChange={handleChange}/>
                        <table>
                            {resultWorkout.fartleks.length > 0 &&
                                <tr>
                                    <th>Set</th>
                                    <th>Reps</th>
                                    <th>Time</th>
                                    <th>Rest Time</th>
                                </tr>
                            }
                            {resultWorkout.fartleks.map((fartlek, index) => {
                                return (
                                    <tr key={index}>
                                        <td>Fartlek {index + 1}</td>
                                        <td>{fartlek.reps}</td>
                                        <td id="time">{fartlek.time}</td>
                                        <td id="rest-time">{fartlek.restTime}</td>
                                    </tr>
                                );
                            })}
                        </table>
                        <div className="interval-add-form">
                            <input type="number" id="reps" name="reps" value={newFartlek.reps} onChange={handleFartlekInputChange}/>
                            <input type="number" id="time" name="time" value={newFartlek.time} onChange={handleFartlekInputChange} />
                            <input type="number" id="restTime" name="restTime" value={newFartlek.restTime} onChange={handleFartlekInputChange} />
                            {error && <p className="error-text">{errorMessage}</p>}
                            <button onClick={handleAddFartlek}>Add Set</button>
                        </div>
                    </div>
                );
        }
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let newWorkout: Workout = resultWorkout;
        if (event.target.value == "interval") {
            newWorkout = {...resultWorkout, intervals: []};
        } else if (event.target.value == "fartlek") {
            newWorkout = {...resultWorkout, fartleks: []};
        } else if (event.target.value == "tempo") {
            newWorkout = {...resultWorkout, tempo: {time: 0, pace: 0}};
        }
        setWorkout({...newWorkout, type: event.target.value as WorkoutType});
    }

    const handleSave = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        onSave(resultWorkout);
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add Workout</h2>
                <form className="add-workout-form">
                    <select id="type" name="type" onChange={handleTypeChange}>
                        <option value="recovery">Recovery</option>
                        <option value="long run">Long Run</option>
                        <option value="interval">Intervals</option>
                        <option value="tempo">Tempo</option>
                        <option value="fartlek">Fartlek</option>
                    </select>
                    {formSwitch()}
                    <button onClick={handleSave}>Save</button>
                </form>
            </div>
        </div>
    )
}