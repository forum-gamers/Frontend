import type { PostResponse } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: PostResponse[];
}

export interface InitialAction {
  setDatas: (datas: PostResponse[]) => void;
  resetDatas: () => void;
}

const useUserPost = create<InitialState & InitialAction>((set) => ({
  datas: [],
  setDatas: (datas) =>
    set((state) => ({
      datas: Array.from(
        [...state.datas, ...datas]
          .reduce((acc, item) => acc.set(item.id, item), new Map())
          .values()
      ),
    })),
  resetDatas: () => set((state) => ({ ...state, datas: [] })),
}));

export default useUserPost;
