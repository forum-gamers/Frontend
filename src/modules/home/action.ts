"use server";

import { getServerSideSession } from "@/helpers/global";
import type { ServerAction } from "@/interfaces";
import type { PostResponse } from "@/interfaces/model";
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

export const createPost: ServerAction<PostResponse> = async (formData) => {
  const payload = new FormData();
  payload.append("text", formData.get("text") as string);
  payload.append("privacy", formData.get("privacy") as string);
  payload.append("allowComment", formData.get("allowComment") as string);
  for (const file of formData.getAll("files"))
    payload.append("files", file as File);

  const {
    status,
    data: { data, message },
  } = await request.Mutation<PostResponse>({
    method: "POST",
    url: "/post",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
    data: payload,
  });

  if (status !== 201) return { error: message, data: null };

  return {
    error: null,
    data,
  };
};
