import { create } from 'zustand';

export type UnitSetting = 'imperial' | 'metric';

export interface UnitStore {
    setting: UnitSetting;
    setUnitSetting: (setting: UnitSetting) => void;
}

export const useUnitStore = create<UnitStore>((set) => ({
    setting: 'imperial',
    setUnitSetting: (setting) => set({ setting }),
}));