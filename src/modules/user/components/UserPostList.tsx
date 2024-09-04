"use client";

import type { CustomSession } from "@/interfaces";
import type { PostResponse, UserAttributes } from "@/interfaces/model";
import { CardContent } from "@/components/ui/card";
import PostCard from "@/modules/home/components/PostCard";
import { useEffect } from "react";
import useScroll, { type Fetcher } from "@/hooks/useScroll";
import SkeletonCard from "@/components/common/SkeletonCard";
import usePost from "@/modules/home/hooks/usePost";
import useProfile from "../hooks/useProfile";

export interface UserPostListProps {
  session: CustomSession | null;
  posts: PostResponse[];
  fetcher: Fetcher<PostResponse>;
  user: UserAttributes | null;
}

export default function UserPostList({
  session,
  posts,
  fetcher,
  user,
}: UserPostListProps) {
  const { setDatas, resetDatas } = usePost();
  const { datas, ref, pending } = useScroll<HTMLDivElement, PostResponse>(
    usePost,
    fetcher
  );
  const { setUser } = useProfile();

  useEffect(() => {
    resetDatas();
    setDatas(posts);
    if (user && session?.user?.id !== user?.id) setUser(user);
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
