"use client";

import useScroll, {
  type Fetcher,
  type UseScrollPostProps,
} from "@/hooks/useScroll";
import type { CustomSession } from "@/interfaces";
import type { PostResponse } from "@/interfaces/model";
import PostCard from "@/modules/home/components/PostCard";
import NoDataState from "./NoDataState";
import SkeletonCard from "./SkeletonCard";
import { memo } from "react";
import { cn } from "@/lib/utils";

export interface PostListProps {
  fetcher: Fetcher<PostResponse>;
  session: CustomSession | null;
  handler: UseScrollPostProps<PostResponse>;
}

function PostList({ fetcher, session, handler }: PostListProps) {
  const { datas, ref, pending } = useScroll<HTMLDivElement, PostResponse>(
    handler,
    fetcher
  );

  return (
    <div
      className={cn(
        "space-y-6 no-scrollbar mx-auto max-w-lg",
        "overflow-y-scroll overflow-x-hidden scroll-smooth scroll-px-2 overscroll-auto hover:overscroll-contain",
        "mb-8"
      )}
    >
      {!!datas?.length ? (
        datas.map((data) => (
          <PostCard session={session} key={data.id} data={data} />
        ))
      ) : (
        <NoDataState />
      )}
      <div ref={ref}></div>
      {pending && <SkeletonCard />}
    </div>
  );
}

export default memo(PostList);
