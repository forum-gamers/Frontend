"use server";

import type { PostAttributes } from "@/interfaces/model";
import request from "@/lib/axios";

export const fetchPosts = async (token: string) => {
  const {
    status,
    data: { data, message },
  } = await request.Query<PostAttributes[]>({
    url: "/post",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (status !== 200) return { data: [] as PostAttributes[], error: message };

  return { data, error: null };
};
