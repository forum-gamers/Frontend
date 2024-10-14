"use client";

import type { PostResponse } from "@/interfaces/model";
import { CardContent } from "@/components/ui/card";
import PostCard from "@/modules/home/components/PostCard";
import { useEffect } from "react";
import useScroll, { type Fetcher } from "@/hooks/useScroll";
import SkeletonCard from "@/components/common/SkeletonCard";
import usePost from "@/modules/home/hooks/usePost";
import NoDataState from "@/components/common/NoDataState";
import { useSession } from "next-auth/react";
import type { CustomSession } from "@/interfaces";

export interface UserPostListProps {
  fetcher: Fetcher<PostResponse>;
}

export default function UserPostList({ fetcher }: UserPostListProps) {
  const { setDatas, resetDatas } = usePost();
  const { datas, ref, pending } = useScroll<HTMLDivElement, PostResponse>(
    usePost,
    fetcher
  );

  const { data: session } = useSession();
  useEffect(() => {
    resetDatas();
    setDatas([]);
  }, []);

  return (
    <CardContent className="flex flex-col p-0 gap-2 w-full space-y-6 border-none">
      {!!datas.length ? (
        datas.map((post, idx) => (
          <PostCard
            key={post.id}
            data={post}
            session={session as CustomSession | null}
            dataAos={idx % 2 === 0 ? "fade-right" : "fade-left"}
          />
        ))
      ) : (
        <NoDataState />
      )}
      <div ref={ref}></div>
      {pending && <SkeletonCard />}
    </CardContent>
  );
}
