import { useState } from "react";
import { AddWorkoutModalComponent } from "./types";

export const AddWorkoutModal: AddWorkoutModalComponent = ({
    onClose,
    onSave,
    date,
}) => {
    const [workoutType, setWorkoutType] = useState<string>("");
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
                            <label htmlFor="reps">Reps</label>
                            <input type="number" id="reps" name="reps" required />
                        </div>
                        <button>Add Set</button>
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
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}