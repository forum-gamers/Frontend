"use server";

import { getServerSideSession } from "@/helpers/global";
import type { BasePagination } from "@/interfaces";
import type { PostResponse } from "@/interfaces/model";
import request from "@/lib/axios";

export const fetchBookmark = async ({
  page = 1,
  limit = 15,
}: BasePagination) => {
  const {
    status,
    data: { data = [], message },
  } = await request.Query<PostResponse[]>({
    url: "/post/bookmarked",
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
    params: { page, limit },
  });

  if (status !== 200) return { error: message, data: [] };

  return { error: null, data };
};
