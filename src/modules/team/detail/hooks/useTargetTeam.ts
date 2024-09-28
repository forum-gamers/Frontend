import type { GetTeamDto } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  data: GetTeamDto | null;
}

export interface InitialAction {
  setData: (data: GetTeamDto) => void;
  resetData: () => void;
}

const useTargetTeam = create<InitialState & InitialAction>((set) => ({
  data: null,
  setData: (data) => set({ data }),
  resetData: () => set({ data: null }),
}));

export default useTargetTeam;
