"use server";

import { getServerSideSession } from "@/helpers/global";
import type { ServerAction, ServerActionResult } from "@/interfaces";
import type {
  GameAttributes,
  GetTeamDto,
  GetTeamMemberAttributes,
  TeamAttributes,
  TeamMemberAttributes,
  UserAttributes,
} from "@/interfaces/model";
import type { BaseQuery } from "@/interfaces/request";
import type { PaginationRespProps } from "@/interfaces/response";
import request from "@/lib/axios";

export const fetchGame = async () => {
  const {
    data: { data = [], message },
    status,
  } = await request.Query<GameAttributes[]>({
    url: "/game",
  });

  if (status !== 200) return { error: message, data: [] };

  return { data, error: null };
};

export const createTeam: ServerAction<{
  team: TeamAttributes;
  game: GameAttributes;
  user: Pick<
    UserAttributes,
    "id" | "imageUrl" | "backgroundImageUrl" | "bio" | "username"
  > & { createdAt: string };
}> = async (formData) => {
  const {
    data: { data, message },
    status,
  } = await request.Mutation<{
    team: TeamAttributes;
    game: GameAttributes;
    user: Pick<
      UserAttributes,
      "id" | "imageUrl" | "backgroundImageUrl" | "bio" | "username"
    > & { createdAt: string };
  }>({
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

export const getTeamMember = async (
  teamId: string,
  {
    page = 1,
    limit = 10,
    q,
    status = true,
  }: BaseQuery & { q?: string; status?: boolean }
) => {
  const {
    data: { data = [], message },
    status: responseStatus,
  } = await request.Query<GetTeamMemberAttributes[]>({
    url: `/team-member/${teamId}`,
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
      status,
    },
  });

  if (responseStatus !== 200) return { error: message, data: [] };

  return { data, error: null };
};

export const getTeamById = async (id: string) => {
  const {
    data: { data = null, message },
    status,
  } = await request.Query<GetTeamDto>({
    url: `/team/${id}`,
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

export const joinTeam = async (teamId: string) => {
  const {
    data: { data = null, message },
    status,
  } = await request.Mutation<TeamMemberAttributes>({
    url: `/team-member/${teamId}`,
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

  return { data, error: null };
};

export const leaveTeam = async (teamId: string) => {
  const {
    data: { message },
    status,
  } = await request.Mutation({
    url: `/team-member/${teamId}`,
    method: "DELETE",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 200) return { error: message, data: null };

  return { data: null, error: null };
};

export const approveTeamMember = async (teamId: string, memberId: string) => {
  const {
    data: { message },
    status,
  } = await request.Mutation({
    method: "PATCH",
    url: `/team/${teamId}/${memberId}`,
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 200) return { error: message, data: null };

  return { data: null, error: null };
};

export const rejectTeamMember = async (teamId: string, memberId: string) => {
  const {
    data: { message },
    status,
  } = await request.Mutation({
    method: "DELETE",
    url: `/team/${teamId}/${memberId}`,
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 200) return { error: message, data: null };

  return { data: null, error: null };
};
