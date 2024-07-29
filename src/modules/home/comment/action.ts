"use server";

import { getServerSideSession } from "@/helpers/global";
import type { CommentResponse } from "@/interfaces/model";
import request from "@/lib/axios";

export const fetchPostComment = async (postId: number) => {
  const {
    status,
    data: { data, message },
  } = await request.Query<CommentResponse[]>({
    url: `/comment/${postId}`,
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 200) return { data: [] as CommentResponse[], error: message };

  return { data, error: null };
};
