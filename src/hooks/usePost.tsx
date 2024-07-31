import type { PostResponse } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: PostResponse[];
}

export interface InitialAction {
  setDatas: (datas: PostResponse[]) => void;
  updateLike: (id: number) => void;
  updateCountComment: (id: number) => void;
  addPost: (post: PostResponse) => void;
}

const usePost = create<InitialState & InitialAction>((set) => ({
  datas: [],
  setDatas: (datas) => set({ datas }),
  updateLike: (id: number) =>
    set(({ datas }) => ({
      datas: datas.map((data) =>
        data.id === id
          ? {
              ...data,
              isLiked: !data.isLiked,
              countLike: data.countLike + (data.isLiked ? -1 : 1),
            }
          : data
      ),
    })),
  updateCountComment: (id: number) =>
    set(({ datas }) => ({
      datas: datas.map((data) =>
        data.id === id
          ? {
              ...data,
              countComment: +data.countComment + 1,
            }
          : data
      ),
    })),
  addPost: (post) => set((state) => ({ datas: [post, ...state.datas] })),
}));

export default usePost;
