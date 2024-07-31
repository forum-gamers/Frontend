"use server";

import { getServerSideSession } from "@/helpers/global";
import type { ServerAction } from "@/interfaces";
import type { CommentResponse, ReplyResponse } from "@/interfaces/model";
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

export const postAComment: ServerAction<CommentResponse> = async (formData) => {
  const {
    status,
    data: { data, message },
  } = await request.Mutation<CommentResponse>({
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
    method: "POST",
    url: `/comment/${formData.get("postId")}`,
  });

  if (status !== 201) return { error: message, data: null };

  return { data, error: null };
};
