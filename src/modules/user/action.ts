"use server";

import { getServerSideSession } from "@/helpers/global";
import type { UserAttributes } from "@/interfaces/model";
import request from "@/lib/axios";

export const getMe = async () => {
  const {
    status,
    data: { data, message },
  } = await request.Query<UserAttributes>({
    url: "/user/me",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 200) return { error: message, data: null };

  return { data, error: null };
};
