import type { CommunityEventWithCreator } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: CommunityEventWithCreator[];
}

export interface InitialAction {
  setDatas: (datas: CommunityEventWithCreator[]) => void;
  resetDatas: () => void;
}

const useCommunityEvent = create<InitialState & InitialAction>((set) => ({
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

export default useCommunityEvent;
