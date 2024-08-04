import { useEffect, useRef, useState, useTransition } from "react";
import usePost from "./usePost";
import { fetchPosts } from "../action";

export default function useScrollPost<T extends HTMLElement>() {
  const { setDatas, datas } = usePost();
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
              const { data, error } = await fetchPosts({
                page,
                limit,
              });
              if (error || !data.length || data.length < limit)
                setHasMore(false);

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
  }, [datas.length, startTransition, hasMore, pending, page]);

  return { datas, pending, ref };
}
