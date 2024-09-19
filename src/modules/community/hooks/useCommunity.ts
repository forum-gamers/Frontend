import type { CommunityListAttributes } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: CommunityListAttributes[];
}

export interface InitialAction {
  setDatas: (datas: CommunityListAttributes[]) => void;
  resetDatas: () => void;
}

const useCommunity = create<InitialState & InitialAction>((set) => ({
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

export default useCommunity;
