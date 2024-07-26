"use server";

import type { ServerAction } from "@/interfaces";
import request from "@/lib/axios";
import { revalidatePath } from "next/cache";

export const forgetPasswordHandler: ServerAction = async (formData) => {
  const {
    status,
    data: { message },
  } = await request.Mutation({
    url: "/user/forget-password",
    method: "POST",
    data: {
      email: formData.get("email") as string,
    },
    params: {
      lang: formData.get("lang") as string,
    },
  });

  if (status !== 200) return { data: null, error: message };

  revalidatePath("/forget-password");

  return {
    data: "OK",
    error: null,
  };
};
