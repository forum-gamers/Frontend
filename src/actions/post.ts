"use server";

import { getServerSideSession } from "@/helpers/global";
import type { ServerAction } from "@/interfaces";
import type { ReplyResponse } from "@/interfaces/model";
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

export const replyComment: ServerAction<ReplyResponse> = async (formData) => {
  const {
    status,
    data: { data, message },
  } = await request.Mutation<ReplyResponse>({
    method: "POST",
    url: `/reply/${formData.get("commentId")}`,
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
    data: {
      text: formData.get("text"),
    },
  });

  if (status !== 201) return { error: message, data: null };

  return { error: null, data };
};
