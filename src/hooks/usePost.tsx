import type { PostResponse } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: PostResponse[];
}

export interface InitialAction {
  setDatas: (datas: PostResponse[]) => void;
  updateLike: (id: number) => void;
}

const usePost = create<InitialState & InitialAction>((set) => ({
  datas: [],
  setDatas: (datas) => set({ datas }),
  updateLike: (id: number) =>
    set(({ datas }) => ({
      datas: datas.map((data) =>
        data.id === id ? { ...data, isLiked: !data.isLiked } : data
      ),
    })),
}));

export default usePost;
