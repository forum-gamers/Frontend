import { useEffect, useRef, useState, useTransition } from "react";
import type { PostResponse } from "@/interfaces/model";
import type { BasePagination, ServerActionResult } from "@/interfaces";

export type UseScrollPostProps = () => {
  datas: PostResponse[];
  setDatas: (posts: PostResponse[]) => void;
};

export type Fetcher = ({
  page,
  limit,
}: BasePagination) => Promise<ServerActionResult<PostResponse[]>>;

export default function useScrollPost<T extends HTMLElement>(
  handler: UseScrollPostProps,
  fetcher: Fetcher
) {
  const { setDatas, datas } = handler();
  const [pending, startTransition] = useTransition();
  const ref = useRef<T>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entities) => {
        if (entities?.[0].isIntersecting)
          startTransition(async () => {
            const limit = 15;
            if (hasMore) {
              const { data, error } = await fetcher({
                page,
                limit,
              });
              if (error || !data || !data.length || data.length < limit) {
                setHasMore(false);
                return;
              }

              setDatas(data);
              setPage((prev) => prev + 1);
            }
          });
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      }
    );

    if (ref?.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [
    datas.length,
    startTransition,
    hasMore,
    pending,
    page,
    fetcher,
    setDatas,
  ]);

  return { datas, pending, ref };
}
