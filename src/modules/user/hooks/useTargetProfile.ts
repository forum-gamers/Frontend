import type { Counter } from "@/interfaces";
import type { UserAttributes } from "@/interfaces/model";
import { create } from "zustand";

export interface InitialState {
  target: UserAttributes | null;
}

export interface InitialAction {
  setTarget: (target: UserAttributes) => void;
  updateUserFollowing: (props: Counter) => void;
  updateUserFollower: (props: Counter) => void;
}

const useTargetProfile = create<InitialState & InitialAction>((set) => ({
  target: null,
  setTarget: (target) => set({ target }),
  updateUserFollowing: (props) =>
    set((prev) => ({
      ...prev,
      target: prev.target
        ? {
            ...prev.target,
            followingCount:
              prev.target.followingCount + (props === "increment" ? 1 : -1),
          }
        : null,
    })),
  updateUserFollower: (props) =>
    set((prev) => ({
      ...prev,
      target: prev.target
        ? {
            ...prev.target,
            followersCount:
              prev.target.followersCount + (props === "increment" ? 1 : -1),
            isFollower: props === "increment",
          }
        : null,
    })),
}));

export default useTargetProfile;
