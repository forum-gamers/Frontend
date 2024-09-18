import type { CommunityAttributes } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: CommunityAttributes[];
}

export interface InitialAction {
  setDatas: (datas: CommunityAttributes[]) => void;
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
}));

export default useCommunity;
