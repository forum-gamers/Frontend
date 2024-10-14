import { useEffect, useRef, useState, useTransition } from "react";
import type { BasePagination, ServerActionResult } from "@/interfaces";

export type UseScrollPostProps<T> = () => {
  datas: T[];
  setDatas: (data: T[]) => void;
};

export type Fetcher<T> = ({
  page,
  limit,
}: BasePagination) => Promise<ServerActionResult<T[]>>;

export default function useScroll<T extends HTMLElement, TData>(
  handler: UseScrollPostProps<TData>,
  fetcher: Fetcher<TData>
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
