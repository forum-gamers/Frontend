"use server";

import type { ServerAction } from "@/interfaces";
import type { UserAttributes } from "@/interfaces/model";
import request from "@/lib/axios";
import { revalidatePath } from "next/cache";

export const registerHandler: ServerAction<{
  user: UserAttributes;
  token: string;
}> = async (formData) => {
  const {
    status,
    data: { data, message },
  } = await request.Mutation<{
    user: UserAttributes;
    token: string;
  }>({
    url: "/user/register",
    method: "POST",
    data: {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      phoneNumber: formData.get("phoneNumber") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    },
  });

  if (status !== 201) return { data: null, error: message };

  revalidatePath("/register");

  return { data, error: null };
};
