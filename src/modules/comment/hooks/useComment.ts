import type { CommentResponse, ReplyResponse } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: CommentResponse[];
}

export interface InitialAction {
  setDatas: (datas: CommentResponse[]) => void;
  addReply: (reply: ReplyResponse) => void;
  addComment: (comment: CommentResponse) => void;
  resetData: () => void;
}

const useComment = create<InitialState & InitialAction>((set) => ({
  datas: [],
  setDatas: (datas) =>
    set((state) => ({
      datas: Array.from(
        [...state.datas, ...datas]
          .reduce((acc, item) => acc.set(item.id, item), new Map())
          .values()
      ),
    })),
  addReply: (reply) =>
    set((state) => ({
      datas: state.datas.map((data) =>
        data.id === reply.commentId
          ? { ...data, replies: [...(data?.replies || []), reply] }
          : data
      ),
    })),
  addComment: (comment) =>
    set((state) => ({ datas: [comment, ...state?.datas] })),
  resetData: () => set((prev) => ({ ...prev, datas: [] })),
}));

export default useComment;
