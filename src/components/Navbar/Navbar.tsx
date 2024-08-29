import { Link } from "react-router-dom"
import { NavbarComponent } from "./types"
import { useUnitStore } from "../../stores/SettingsStore";
import { SwitchComponent } from "./types";

export const Navbar: NavbarComponent = ({ items }) => {
    const { setting, setUnitSetting } = useUnitStore();
    return (
        <nav>
            <ul>
                {items.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    );
                })}
            </ul>
            <Switch setting={setting} onClick={setUnitSetting}/>
        </nav>
    );
}

const Switch: SwitchComponent = ({
    setting,
    onClick,
   }) => {
    const SWITCH_WIDTH_PX = 72;
    const HANDLE_DIAMETER_PX = 30;
    const SWITCH_OFFSET_PX = 3;
    return (
        <>
            <div
                style={{
                    width: SWITCH_WIDTH_PX,
                    height: HANDLE_DIAMETER_PX + 2 * SWITCH_OFFSET_PX,
                    borderRadius: HANDLE_DIAMETER_PX,
                    border: "1px #ddd solid",
                    position: "relative",
                    transition: "1s",
                    cursor: "pointer",
                    background: setting == 'imperial' ? "blue" : "aliceblue",
                }}
                onClick={() => {
                    onClick(setting == 'imperial' ? 'metric' : 'imperial');
                }}
            >
                <div style={{
                        background: (setting == 'imperial') ? 'white' : 'blue',
                        borderRadius: "100%",
                        height: HANDLE_DIAMETER_PX,
                        width: HANDLE_DIAMETER_PX,
                        position: "absolute",
                        top: SWITCH_OFFSET_PX,
                        left: setting == 'imperial'
                        ? SWITCH_WIDTH_PX - HANDLE_DIAMETER_PX - SWITCH_OFFSET_PX
                        : SWITCH_OFFSET_PX,
                        transition: "1s" }}></div>
                <input
                    type="checkbox"
                    value={setting}
                    onChange={(e) => {
                        onClick(e.target.value == 'imperial' ? 'metric' : 'imperial');
                    } }
                    style={{ display: "none" }} />
            </div>
        </>
    );
};