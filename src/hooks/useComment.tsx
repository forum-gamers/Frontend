import type { CommentResponse, ReplyResponse } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: CommentResponse[];
}

export interface InitialAction {
  setDatas: (datas: CommentResponse[]) => void;
  addReply: (reply: ReplyResponse) => void;
}

const useComment = create<InitialState & InitialAction>((set) => ({
  datas: [],
  setDatas: (datas) => set({ datas }),
  addReply: (reply) =>
    set((state) => ({
      datas: state.datas.map((data) =>
        data.id === reply.commentId
          ? { ...data, replies: [...data.replies, reply] }
          : data
      ),
    })),
}));

export default useComment;
