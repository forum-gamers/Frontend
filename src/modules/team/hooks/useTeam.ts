import type { GetTeamDto } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: GetTeamDto[];
}

export interface InitialAction {
  setDatas: (datas: GetTeamDto[]) => void;
  resetDatas: () => void;
}

const useTeam = create<InitialState & InitialAction>((set) => ({
  datas: [],

  setDatas: (datas) =>
    set((state) => ({
      datas: Array.from(
        [...datas, ...state.datas]
          .reduce((acc, item) => acc.set(item.id, item), new Map())
          .values()
      ),
    })),

  resetDatas: () => set({ datas: [] }),
}));

export default useTeam;
