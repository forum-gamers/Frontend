"use server";

import { getServerSideSession } from "@/helpers/global";
import type { ServerAction } from "@/interfaces";
import type { SearchResultDto } from "@/interfaces/response";
import request from "@/lib/axios";

export const searchHandler: ServerAction<SearchResultDto[]> = async (
  formData
) => {
  const {
    status,
    data: { data, message },
  } = await request.Query<SearchResultDto[]>({
    url: "/search",
    params: { q: formData.get("q") },
    headers: {
      authorization: `Bearer ${
        (
          await getServerSideSession()
        )?.user?.access_token
      }`,
    },
  });

  if (status !== 200) return { data: [], error: message };

  return { data, error: null };
};
