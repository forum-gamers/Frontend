import type { BasePagination, ServerActionResult } from "@/interfaces";
import type { BaseQuery } from "@/interfaces/request";
import type { PaginationRespProps } from "@/interfaces/response";
import { useEffect, useState, useTransition } from "react";

export type UsePaginationProps<T> = () => {
  datas: T[];
  setDatas: (datas: T[]) => void;
  resetDatas: () => void;
};

export type Fetcher<T, Opts extends BaseQuery = {}> = (
  props: BasePagination & Opts
) => Promise<ServerActionResult<T[], PaginationRespProps>>;

export default function usePagination<T, Opts extends BaseQuery = {}>(
  handler: UsePaginationProps<T>,
  fetcher: Fetcher<T, Opts>,
  { page: initialPage = 1, limit: initialLimit = 10, ...rest }: BaseQuery & Opts
) {
  const { datas, setDatas, resetDatas } = handler();
  const [pending, startTransition] = useTransition();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [metadata, setMetadata] = useState({
    totalData: 0,
    totalPage: 0,
  });

  useEffect(() => {
    startTransition(async () => {
      const {
        data = [],
        error,
        totalData = 0,
        totalPage = 0,
      } = await fetcher({
        page,
        limit,
        ...(rest as Opts),
      });
      if (error || !data?.length) {
        setHasMore(false);
        return;
      }
      if (data.length < limit) setHasMore(false);

      setHasMore(true);
      resetDatas();
      setDatas(data);
      setMetadata({
        totalData,
        totalPage,
      });
    });
  }, [page, setPage]);

  return {
    datas,
    setLimit,
    setPage,
    pending,
    hasMore,
    page,
    limit,
    totalPage: metadata.totalPage,
    totalData: metadata.totalData,
  };
}
