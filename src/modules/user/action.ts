"use server";

import { getServerSideSession } from "@/helpers/global";
import type { BasePagination, ServerAction } from "@/interfaces";
import type {
  FollowAttributes,
  UserAttributes,
  UserRecomendationAttributes,
} from "@/interfaces/model";
import request from "@/lib/axios";
import { revalidatePath } from "next/cache";

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

export const getUserById = async (id: string) => {
  const {
    status,
    data: { data, message },
  } = await request.Query<UserAttributes>({
    url: `/user/${id}`,
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 200) return { error: message, data: null };

  return { error: null, data };
};

export const getFollowRecomendation = async () => {
  const {
    status,
    data: { data, message },
  } = await request.Query<UserRecomendationAttributes[]>({
    url: "/follow/recomendation",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
    params: {
      page: 1,
      limit: 15,
    },
  });

  if (status !== 200) return { error: message, data: [] };

  return { error: null, data };
};

export const follow = async (id: string) => {
  const {
    status,
    data: { message },
  } = await request.Mutation({
    url: `/follow/${id}`,
    method: "POST",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 200) return { error: message };
  revalidatePath(`/user/${id}`);

  return { error: null };
};

export const unFollow = async (id: string) => {
  const {
    status,
    data: { message },
  } = await request.Mutation({
    url: `/follow/${id}`,
    method: "DELETE",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 200) return { error: message };

  revalidatePath(`/user/${id}`);
  return { error: null };
};

export const getMyFollower = async ({
  page = 1,
  limit = 15,
}: BasePagination) => {
  const {
    data: { data = [], message },
    status,
  } = await request.Query<FollowAttributes[]>({
    url: "/follow",
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

  if (status !== 200) return { error: message, data: [] as FollowAttributes[] };

  return { error: null, data };
};

export const getMyFollowing = async ({
  page = 1,
  limit = 15,
}: BasePagination) => {
  const {
    data: { data = [], message },
    status,
  } = await request.Query<FollowAttributes[]>({
    url: "/follow/following",
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

  if (status !== 200) return { error: message, data: [] as FollowAttributes[] };

  return { error: null, data };
};

export const getUserFollower = async (
  userId: string,
  { page = 1, limit = 15 }: BasePagination
) => {
  console.log(userId, "userFollower");
  const {
    data: { data = [], message },
    status,
  } = await request.Query<FollowAttributes[]>({
    url: `/follow/${userId}`,
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

  if (status !== 200) return { error: message, data: [] as FollowAttributes[] };

  return { error: null, data };
};

export const getUserFollowing = async (
  userId: string,
  { page = 1, limit = 15 }: BasePagination
) => {
  console.log(userId, "userFollowing");
  const {
    data: { data = [], message },
    status,
  } = await request.Query<FollowAttributes[]>({
    url: `/follow/following/${userId}`,
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

  if (status !== 200) return { error: message, data: [] as FollowAttributes[] };

  return { error: null, data };
};

export const updateBio: ServerAction = async (formData) => {
  const {
    data: { message },
    status,
  } = await request.Mutation({
    method: "PATCH",
    url: "/user/bio",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
    data: {
      bio: formData.get("bio"),
    },
  });
  if (status !== 200) return { error: message, data: null };

  return { data: null, error: null };
};

export const updateImg: ServerAction = async (formData) => {
  const {
    data: { message, data },
    status,
  } = await request.Mutation<string>({
    method: "PATCH",
    url: "/user/image",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
    data: formData,
    params: { field: formData.get("field") },
  });
  if (status !== 200) return { error: message, data: null };

  return { data, error: null };
};
