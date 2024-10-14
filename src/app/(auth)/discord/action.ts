"use server";

import request from "@/lib/axios";

export const discordCallback = async (code: string) => {
  const {
    data: { data, message },
    status,
  } = await request.Query<string>({
    url: "/user/discord/callback",
    params: { code },
  });

  if (status !== 200) return { error: message, data: null };

  return { data, error: null };
};
