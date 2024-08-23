"use client";

import type { CustomSession } from "@/interfaces";
import type { PostResponse } from "@/interfaces/model";
import { CardContent } from "@/components/ui/card";
import PostCard from "@/modules/home/components/PostCard";
import useUserPost from "../hooks/useUserPost";
import { useEffect } from "react";
import useScrollPost, {
  type Fetcher,
} from "@/modules/home/hooks/useScrollPost";
import SkeletonCard from "@/components/common/SkeletonCard";

export interface UserPostListProps {
  session: CustomSession | null;
  posts: PostResponse[];
  fetcher: Fetcher;
}

export default function UserPostList({
  session,
  posts,
  fetcher,
}: UserPostListProps) {
  const { setDatas, resetDatas } = useUserPost();
  const { datas, ref, pending } = useScrollPost<HTMLDivElement>(
    useUserPost,
    fetcher
  );

  useEffect(() => {
    resetDatas();
    setDatas(posts);
  }, []);

  return (
    <CardContent className="flex flex-col p-0 gap-2 w-full space-y-6 border-none">
      {!!datas.length &&
        datas.map((post, idx) => (
          <PostCard
            key={post.id}
            data={post}
            session={session}
            dataAos={idx % 2 === 0 ? "fade-right" : "fade-left"}
          />
        ))}
      <div ref={ref}></div>
      {pending && <SkeletonCard />}
    </CardContent>
  );
}
