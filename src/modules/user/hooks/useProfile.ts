import type { UserAttributes } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  me: UserAttributes | null;
}

export interface InitialAction {
  setUser: (user: UserAttributes) => void;
}

const useProfile = create<InitialState & InitialAction>((set) => ({
  me: null,
  setUser: (me) => set((prev) => ({ ...prev, me })),
}));

export default useProfile;
