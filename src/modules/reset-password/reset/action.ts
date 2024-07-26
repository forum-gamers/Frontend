"use server";

import type { ServerAction } from "@/interfaces";
import request from "@/lib/axios";
import { revalidatePath } from "next/cache";

export const resetPasswordHandler: ServerAction = async (formData) => {
  const {
    status,
    data: { message },
  } = await request.Mutation({
    url: "/user/change-password",
    method: "PATCH",
    data: {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    },
    headers: {
      authorization: `Bearer ${formData.get("token") as string}`,
    },
  });

  if (status !== 200) return { data: null, error: message };

  revalidatePath("/reset-password");

  return {
    data: "OK",
    error: null,
  };
};
