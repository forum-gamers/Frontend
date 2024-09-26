import { create } from "zustand";

export interface InitialState {
  open: boolean;
}

export interface InitialAction {
  setOpen: (open: boolean) => void;
}

const useForm = create<InitialState & InitialAction>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export default useForm;
