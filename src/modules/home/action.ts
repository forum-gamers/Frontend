"use server";

import { getServerSideSession } from "@/helpers/global";
import type { BasePagination, ServerAction } from "@/interfaces";
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

export const deletePost = async (postId: number) => {
  const {
    status,
    data: { message },
  } = await request.Mutation({
    method: "DELETE",
    url: `/post/${postId}`,
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

export const editPostText = async (text: string, postId: number) => {
  "use server";
  const {
    status,
    data: { message },
  } = await request.Mutation({
    method: "PATCH",
    url: `/post/${postId}`,
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
    data: {
      text,
    },
  });

  if (status !== 200) return { error: message };

  return { error: null };
};

export const fetchPosts = async ({ page, limit }: BasePagination) => {
  const {
    status,
    data: { data, message },
  } = await request.Query<PostResponse[]>({
    url: "/post",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
    params: {
      page,
      limit,
    },
  });

  if (status !== 200) return { data: [] as PostResponse[], error: message };

  return { data, error: null };
};

export const fetchPostById = async (postId: number) => {
  const {
    status,
    data: { data, message },
  } = await request.Query<PostResponse>({
    url: `/post/${postId}`,
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 200) return { data: null, error: message };

  return { data, error: null };
};

export const bookmarkPost = async (postId: number) => {
  const {
    status,
    data: { message },
  } = await request.Mutation({
    method: "POST",
    url: `/bookmark/${postId}`,
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

export const unBookmarkPost = async (postId: number) => {
  const {
    status,
    data: { message },
  } = await request.Mutation({
    method: "DELETE",
    url: `/bookmark/${postId}`,
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
