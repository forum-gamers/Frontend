import type { FollowAttributes } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: FollowAttributes[];
}

export interface InitialAction {
  setDatas: (datas: FollowAttributes[]) => void;
  resetData: () => void;
}

const useFollow = create<InitialState & InitialAction>((set) => ({
  datas: [],
  setDatas: (datas) =>
    set((state) => ({
      datas: Array.from(
        [...state.datas, ...datas]
          .reduce((acc, item) => acc.set(item.id, item), new Map())
          .values()
      ),
    })),
  resetData: () => set({ datas: [] }),
}));

export default useFollow;
