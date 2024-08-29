import { FunctionComponent } from "react";
import { UnitSetting } from "../../stores/SettingsStore";

export interface NavbarItem {
    label: string;
    path: string;
}

export interface NavbarProps {
    items: NavbarItem[];
}

export interface SwitchProps {
    setting: UnitSetting;
    onClick: (setting: UnitSetting) => void;
}

export type SwitchComponent = FunctionComponent<SwitchProps>;

export type NavbarComponent = FunctionComponent<NavbarProps>;