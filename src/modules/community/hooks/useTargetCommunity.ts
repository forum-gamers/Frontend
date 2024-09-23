import type { CommunityListAttributes } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  data: CommunityListAttributes | null;
}

export interface InitialAction {
  setDatas: (data: CommunityListAttributes) => void;
  resetDatas: () => void;
}

const useTargetCommunity = create<InitialState & InitialAction>((set) => ({
  data: null,
  setDatas: (data) => set({ data }),
  resetDatas: () => set({ data: null }),
}));

export default useTargetCommunity;
