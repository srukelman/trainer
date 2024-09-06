import { useEffect, useState } from "react";
import { AddWorkoutModalComponent, Workout } from "./types";

export const AddWorkoutModal: AddWorkoutModalComponent = ({
    onClose,
    onSave,
    workout,
}) => {
    const [workoutType, setWorkoutType] = useState<string>("");
    const [resultWorkout, setWorkout] = useState<Workout>(workout || {
        id: 0,
        title: "",
        athlete: "",
        distance: 0,
        time: 0,
        date: "",
        type: "",
        intervals: [],
        fartleks: [],
        tempo: {
            time: 0,
            pace: 0,
        }
    });

    useEffect(() => {
        console.log(resultWorkout.intervals);
    }, [resultWorkout]);

    const handleAddSet = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const interval = {
            reps: parseInt((document.getElementById("reps") as HTMLInputElement).value),
            distance: parseInt((document.getElementById("distance") as HTMLInputElement).value),
            time: parseInt((document.getElementById("time") as HTMLInputElement).value),
            restTime: parseInt((document.getElementById("rest-time") as HTMLInputElement).value),
        }
        resultWorkout.intervals.push(interval);
        setWorkout(resultWorkout);
    }

    const formSwitch = () => {
        switch (workoutType) {
            case "recovery":
                return (
                    <div className="sub-form">
                        <label htmlFor="distance">Distance</label>
                        <input type="number" id="distance" name="distance" required />
                        <label htmlFor="time">Time</label>
                        <input type="number" id="time" name="time" required />
                    </div>
                );
            case "long":
                return (
                    <div className="sub-form">
                        <label htmlFor="distance">Distance</label>
                        <input type="number" id="distance" name="distance" required />
                        <label htmlFor="time">Time</label>
                        <input type="number" id="time" name="time" required />
                    </div>
                );
            case "interval":
                return (
                    <div className="sub-form">
                        <div className="interval-sub-form">
                            <label htmlFor="distance">Distance</label>
                            <input type="number" id="distance" name="distance" required />
                            <label htmlFor="time">Time</label>
                            <input type="number" id="time" name="time" required />
                            <label htmlFor="reps">Intervals</label>
                            {resultWorkout.intervals.map((interval, index) => {
                                return (
                                    <div key={index}>
                                        <label>Set {index + 1}</label>
                                        <p id="reps">{interval.reps}</p>
                                        <p id="distance">{interval.distance}</p>
                                        <p id="time">{interval.time}</p>
                                        <p id="rest-time">{interval.restTime}</p>
                                    </div>
                                );
                            })}
                            <input type="number" id="reps" name="reps" required />
                            <input type="number" id="distance" name="distance" required />
                            <input type="number" id="time" name="time" required />
                            <input type="number" id="rest-time" name="rest-time" required />
                            <button onClick={handleAddSet}>Add Set</button>

                        </div>
                    </div>
                );
            case "tempo":
                return (
                    <div className="sub-form">
                        <label htmlFor="distance">Distance</label>
                        <input type="number" id="distance" name="distance" required />
                        <label htmlFor="time">Time</label>
                        <input type="number" id="time" name="time" required />
                    </div>
                );
            case "fartlek":
                return (
                    <div className="sub-form">
                        <label htmlFor="distance">Distance</label>
                        <input type="number" id="distance" name="distance" required />
                        <label htmlFor="time">Time</label>
                        <input type="number" id="time" name="time" required />
                    </div>
                );
            default:
                return (
                    <div>
                        <label htmlFor="distance">Distance</label>
                        <input type="number" id="distance" name="distance" required />
                        <label htmlFor="time">Time</label>
                        <input type="number" id="time" name="time" required />
                    </div>
                );
        }
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setWorkoutType(event.target.value);
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
                    <select id="type" name="type" onChange={handleTypeChange} required>
                        <option value="recovery">Recovery</option>
                        <option value="long">Long Run</option>
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