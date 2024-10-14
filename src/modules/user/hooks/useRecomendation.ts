import type { UserRecomendationAttributes } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  datas: UserRecomendationAttributes[];
}

export interface InitialAction {
  setDatas: (datas: UserRecomendationAttributes[]) => void;
  updateFollow: (id: string) => void;
}

const useRecomendation = create<InitialState & InitialAction>((set) => ({
  datas: [],
  setDatas: (datas) => set((state) => ({ ...state, datas })),
  updateFollow: (id) =>
    set((state) => ({
      datas: state.datas.filter((data) => data.userId !== id),
    })),
}));

export default useRecomendation;
