import type { GetTeamMemberAttributes } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: GetTeamMemberAttributes[];
}

export interface InitialAction {
  setDatas: (datas: GetTeamMemberAttributes[]) => void;
  resetDatas: () => void;
}

const useMember = create<InitialState & InitialAction>((set) => ({
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

export default useMember;
