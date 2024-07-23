import type { ReactNode } from "react";

export interface ChildrenProps {
  readonly children: ReactNode;
}

export type ServerAction<T = any> = (
  formData: FormData
) => Promise<{ data: T | null; error: Error | null }>;

export type FormAction = (FormData: FormData) => Promise<void>;
