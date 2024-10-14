import type { PostResponse } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: PostResponse[];
}

export interface InitialAction {
  setDatas: (datas: PostResponse[]) => void;
  resetDatas: () => void;
  removeDatas: (id: number) => void;
}

const useBookmark = create<InitialState & InitialAction>((set) => ({
  datas: [],
  setDatas: (datas) =>
    set((state) => ({
      datas: Array.from(
        [...datas, ...state.datas]
          .reduce((acc, item) => acc.set(item.id, item), new Map())
          .values()
      ),
    })),
  resetDatas: () => set((state) => ({ ...state, datas: [] })),
  removeDatas: (id: number) =>
    set(({ datas }) => ({
      datas: datas.filter((el) => el.id !== id),
    })),
}));

export default useBookmark;
