import type { Session } from "next-auth";
import type { ReactNode } from "react";

export interface ChildrenProps {
  readonly children: ReactNode;
}

export type ServerAction<T = any> = (
  formData: FormData
) => Promise<{ data: T | null; error?: string | null }>;

export type FormAction = (FormData: FormData) => Promise<void>;

export interface CustomSession extends Session {
  user?: {
    id?: string;
    name?: string | null;
    access_token?: string | null;
    isVerified: boolean;
  };
}

export type PageProps<
  params = Record<string, string>,
  searchParams = Record<string, string>
> = {
  params: params;
  searchParams?: searchParams;
};

export interface BasePagination {
  page?: number;
  limit?: number;
}

export type Lang = "id" | "en";
