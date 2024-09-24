"use server";

import { getServerSideSession } from "@/helpers/global";
import type {
  BasePagination,
  ServerAction,
  ServerActionResult,
} from "@/interfaces";
import type {
  CommunityAttributes,
  CommunityEventAttributes,
  CommunityEventWithCreator,
  CommunityListAttributes,
  CommunityMembersAttributes,
  DiscordGuild,
  PostResponse,
  UserAttributes,
} from "@/interfaces/model";
import request from "@/lib/axios";
import type { ImportedDiscordServerResponse } from "./interface";
import type { PaginationRespProps } from "@/interfaces/response";
import type { BaseQuery } from "@/interfaces/request";
import { revalidatePath } from "next/cache";

export const createCommunity: ServerAction<CommunityAttributes> = async (
  formData
) => {
  const {
    data: { data, message },
    status,
  } = await request.Mutation<CommunityAttributes>({
    url: "/community",
    method: "POST",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
    data: formData,
  });

  if (status !== 201) return { error: message, data: null };

  return { data, error: null };
};

export const importDiscordServer: ServerAction<
  ImportedDiscordServerResponse
> = async (formData) => {
  const {
    data: { data, message },
    status,
  } = await request.Mutation<ImportedDiscordServerResponse>({
    url: "/community/import-from-discord-server",
    method: "POST",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
    data: {
      discordServerId: formData.get("discordServerId"),
    },
  });

  if (status !== 201) return { error: message, data: null };

  return { data, error: null };
};

export const getMyGuild = async () => {
  const {
    data: { data, message },
    status,
  } = await request.Query<DiscordGuild[]>({
    url: "/discord/guilds",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 200) return { error: message, data: [] };

  return { data, error: null };
};

export const getCommunities = async ({
  page = 1,
  limit = 10,
  q,
}: BasePagination & { q?: string }): Promise<
  ServerActionResult<CommunityListAttributes[], PaginationRespProps>
> => {
  const {
    data: {
      data,
      message,
      totalData = 0,
      totalPage = 0,
      page: currentPage = 1,
      limit: currentLimit = 10,
    },
    status,
  } = await request.Query<CommunityListAttributes[]>({
    url: "/community",
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
      q,
    },
  });

  if (status !== 200)
    return {
      error: message,
      data: [],
      totalData,
      totalPage,
      page: currentPage,
      limit: currentLimit,
    };

  return {
    data,
    error: null,
    totalData,
    totalPage,
    page: currentPage,
    limit: currentLimit,
  };
};

export const getCommunityPost = async (
  id: number,
  { page = 1, limit = 15 }: BasePagination
) => {
  const {
    data: { data, message },
    status,
  } = await request.Query<PostResponse[]>({
    url: `/post/community/${id}`,
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

  if (status !== 200) return { error: message, data: [] };

  return { data, error: null };
};

export const getCommunityMember = async (
  id: number,
  { page = 1, limit = 10 }: BaseQuery
) => {
  const {
    data: { data, message },
    status,
  } = await request.Query<UserAttributes[]>({
    url: `/user/community/${id}`,
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

  if (status !== 200) return { error: message, data: [] };

  return { data, error: null };
};

export const createEvent: ServerAction<CommunityEventAttributes> = async (
  formData
) => {
  const {
    data: { data, message },
    status,
  } = await request.Mutation<CommunityEventAttributes>({
    url: `/community-event/community/${formData.get("communityId")}`,
    method: "POST",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
    data: {
      title: formData.get("title"),
      description: formData.get("description"),
      location: formData.get("location"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      isPublic: Boolean(formData.get("isPublic")),
    },
  });

  if (status !== 201) return { error: message, data: null };

  return { data, error: null };
};

export const getCommunityEvent = async (
  communityId: number,
  { page = 1, limit = 15 }: BaseQuery
) => {
  const {
    data: { data, message },
    status,
  } = await request.Query<CommunityEventWithCreator[]>({
    url: `/community-event/community/${communityId}`,
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

  if (status !== 200) return { error: message, data: [] };

  return { data, error: null };
};

export const getCommunityById = async (communityId: number) => {
  const {
    data: { data, message },
    status,
  } = await request.Query<CommunityListAttributes>({
    url: `/community/${communityId}`,
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

export const updateCommunity: ServerAction<CommunityAttributes> = async (
  formData
) => {
  const {
    data: { data, message },
    status,
  } = await request.Mutation<CommunityAttributes>({
    url: `/community/${formData.get("communityId")}`,
    method: "PUT",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
    data: formData,
  });

  if (status !== 200) return { error: message, data: null };

  return { data, error: null };
};

export const joinCommunity = async (communityId: number) => {
  const {
    data: { data, message },
    status,
  } = await request.Mutation<CommunityMembersAttributes>({
    url: `/community-member/${communityId}`,
    method: "POST",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 201) return { error: message, data: null };

  revalidatePath(`/community/${communityId}`);
  return { data, error: null };
};

export const leaveCommunity = async (communityId: number) => {
  const {
    data: { message },
    status,
  } = await request.Mutation({
    url: `/community-member/${communityId}`,
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

  revalidatePath(`/community/${communityId}`);
  return { error: null };
};
