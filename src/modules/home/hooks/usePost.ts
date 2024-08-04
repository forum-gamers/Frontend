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
  deletePost: (postId: number) => void;
  editPostText: (text: string, postId: number) => void;
  updateBookmark: (id: number) => void;
}

const usePost = create<InitialState & InitialAction>((set) => ({
  datas: [],
  setDatas: (datas) =>
    set((state) => ({
      datas: Array.from(
        [...state.datas, ...datas]
          .reduce((acc, item) => acc.set(item.id, item), new Map())
          .values()
      ),
    })),
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
  updateBookmark: (id: number) =>
    set(({ datas }) => ({
      datas: datas.map((data) =>
        data.id === id
          ? {
              ...data,
              isBookmarked: !data.isBookmarked,
              countBookmark: data.countBookmark + (data.isBookmarked ? -1 : 1),
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
  deletePost: (id) =>
    set(({ datas }) => ({ datas: datas.filter((data) => data.id !== id) })),
  editPostText: (text, postId) =>
    set(({ datas }) => ({
      datas: datas.map((el) =>
        el.id === postId ? { ...el, text, editedText: true } : el
      ),
    })),
}));

export default usePost;
