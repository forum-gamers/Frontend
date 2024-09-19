"use server";

import { getServerSideSession } from "@/helpers/global";
import type {
  BasePagination,
  ServerAction,
  ServerActionResult,
} from "@/interfaces";
import type {
  CommunityAttributes,
  CommunityListAttributes,
  DiscordGuild,
} from "@/interfaces/model";
import request from "@/lib/axios";
import type { ImportedDiscordServerResponse } from "./interface";
import type { PaginationRespProps } from "@/interfaces/response";

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
