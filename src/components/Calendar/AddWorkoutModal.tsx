import { AddWorkoutModalComponent } from "./types";

export const AddWorkoutModal: AddWorkoutModalComponent = ({
    onClose,
    onSave,
    date,
}) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add Workout</h2>
                <form>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required />
                    <label htmlFor="distance">Distance</label>
                    <input type="number" id="distance" name="distance" required />
                    <label htmlFor="time">Time</label>
                    <input type="number" id="time" name="time" required />
                    <label htmlFor="type">Type</label>
                    <select id="type" name="type" required>
                        <option value="run">Run</option>
                        <option value="bike">Bike</option>
                        <option value="swim">Swim</option>
                    </select>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    )
}