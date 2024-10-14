"use server";

import type { ServerAction } from "@/interfaces";
import request from "@/lib/axios";
import { revalidatePath } from "next/cache";

export const loginHandler: ServerAction<string> = async (formData) => {
  const {
    status,
    data: { data, message },
  } = await request.Mutation<string>({
    url: "/user/login",
    method: "POST",
    data: {
      identifier: formData.get("identifier") as string,
      password: formData.get("password") as string,
    },
  });
  if (status !== 200) return { data: null, error: message };

  revalidatePath("/login");

  return {
    data,
    error: null,
  };
};

export const googleLogin = async (token: string) => {
  const {
    status,
    data: { data, message },
  } = await request.Mutation<string>({
    url: "/user/google-login",
    method: "POST",
    headers: {
      "google-token": token,
    },
  });

  if (status !== 200) return { data: null, error: message };

  revalidatePath("/login");

  return {
    data,
    error: null,
  };
};
