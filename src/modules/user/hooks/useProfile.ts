import type { Counter } from "@/interfaces";
import type { UserAttributes } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  me: UserAttributes | null;
}

export interface InitialAction {
  setUser: (user: UserAttributes) => void;
  resetUser: () => void;
  updateUserFollowing: (props: Counter) => void;
  updateUserFollower: (props: Counter) => void;
}

const useProfile = create<InitialState & InitialAction>((set) => ({
  me: null,
  setUser: (me) => set((prev) => ({ ...prev, me })),
  resetUser: () => set({ me: null }),
  updateUserFollowing: (props) =>
    set((prev) => ({
      ...prev,
      me: prev.me
        ? {
            ...prev.me,
            followingCount:
              prev.me.followingCount + (props === "increment" ? 1 : -1),
          }
        : null,
    })),
  updateUserFollower: (props) =>
    set((prev) => ({
      ...prev,
      me: prev.me
        ? {
            ...prev.me,
            followersCount:
              prev.me.followersCount + (props === "increment" ? 1 : -1),
          }
        : null,
    })),
}));

export default useProfile;
