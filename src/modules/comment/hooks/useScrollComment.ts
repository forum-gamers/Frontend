import { useEffect, useRef, useState, useTransition } from "react";
import useComment from "./useComment";
import { fetchPostComment } from "../action";

export interface UseScrollCommentProps {
  postId: number;
}

export default function useScrollComment<T extends HTMLElement>({
  postId,
}: UseScrollCommentProps) {
  const { datas, setDatas } = useComment();
  const [pending, startTransition] = useTransition();
  const ref = useRef<T>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entities) => {
        if (entities?.[0].isIntersecting)
          startTransition(async () => {
            const limit = 10;
            if (hasMore) {
              const { data, error } = await fetchPostComment(postId, {
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

  return { pending, datas, ref };
}
