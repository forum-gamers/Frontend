"use server";

import { getServerSideSession } from "@/helpers/global";
import request from "@/lib/axios";

export const likePost = async (postId: number) => {
  const {
    status,
    data: { message },
  } = await request.Mutation({
    method: "POST",
    url: `/like/${postId}`,
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 201) return { error: message };

  return { error: null };
};

export const unlikePost = async (postId: number) => {
  const {
    status,
    data: { message },
  } = await request.Mutation({
    method: "DELETE",
    url: `/like/${postId}`,
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 200) return { error: message };

  return { error: null };
};
