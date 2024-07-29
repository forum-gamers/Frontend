"use server";

import type { PostResponse } from "@/interfaces/model";
import request from "@/lib/axios";

export const fetchPosts = async (token: string) => {
  const {
    status,
    data: { data, message },
  } = await request.Query<PostResponse[]>({
    url: "/post",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (status !== 200) return { data: [] as PostResponse[], error: message };

  return { data, error: null };
};
