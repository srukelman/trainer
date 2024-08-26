import { CalendarComponent } from "./types"
import { useState } from "react";
import classNames from "classnames";

export const Calendar: CalendarComponent = ({
    currentDay,
}) => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const [state, _] = useState({currentDay: currentDay || new Date()});
    
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
                            return (
                                <td
                                key={(state.currentDay.getMonth(), index - state.currentDay.getDay() + state.currentDay.getDate())}
                                className={classNames("CalendarTable--data", {
                                    "CalendarTable--data-today": index == state.currentDay.getDay()
                                })}
                                >
                                    Workout Completed:
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

