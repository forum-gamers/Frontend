"use server";

import { getServerSideSession } from "@/helpers/global";
import type {
  UserAttributes,
  UserRecomendationAttributes,
} from "@/interfaces/model";
import request from "@/lib/axios";

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
