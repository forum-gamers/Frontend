"use server";

import { getServerSideSession } from "@/helpers/global";
import type { ServerAction, ServerActionResult } from "@/interfaces";
import type { GetTeamDto, TeamAttributes } from "@/interfaces/model";
import type { BaseQuery } from "@/interfaces/request";
import type { PaginationRespProps } from "@/interfaces/response";
import request from "@/lib/axios";

export const fetchGame = async () => {
  const {
    data: { data = [], message },
    status,
  } = await request.Query<TeamAttributes[]>({
    url: "/game",
  });

  if (status !== 200) return { error: message, data: [] };

  return { data, error: null };
};

export const createTeam: ServerAction<any> = async (formData) => {
  const {
    data: { data, message },
    status,
  } = await request.Mutation({
    url: `/team/${formData.get("gameId")}`,
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

export const getTeam = async ({
  page,
  limit,
  q,
}: BaseQuery & { q?: string }): Promise<
  ServerActionResult<GetTeamDto[], PaginationRespProps>
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
  } = await request.Query<GetTeamDto[]>({
    url: "/team",
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
