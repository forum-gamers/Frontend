import type { CommentResponse } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: CommentResponse[];
}

export interface InitialAction {
  setDatas: (datas: CommentResponse[]) => void;
}

const useComment = create<InitialState & InitialAction>((set) => ({
  datas: [],
  setDatas: (datas) => set({ datas }),
}));

export default useComment;
