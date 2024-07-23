"use server";

import type { ServerAction } from "@/interfaces";
import request from "@/libs/axios";

export const loginHandler: ServerAction<string> = async (formData) => {
  const {
    status,
    data: { data, message },
  } = await request.Mutation<string>({
    url: "/user/login",
    method: "POST",
    data: {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    },
  });
  if (status !== 200) return { data: null, error: new Error(message) };

  return {
    data,
    error: null,
  };
};
