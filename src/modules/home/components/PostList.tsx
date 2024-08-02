"use client";

import type { CustomSession } from "@/interfaces";
import PostCard from "./PostCard";
import useScrollPost from "../hooks/useScrollPost";
import SkeletonCard from "@/components/common/SkeletonCard";

export interface PostListProps {
  session: CustomSession | null;
}

export default function PostList({ session }: PostListProps) {
  const { datas, ref, pending } = useScrollPost<HTMLDivElement>();

  return (
    <div className="overflow-y-scroll space-y-6 no-scrollbar">
      {!!datas?.length &&
        datas.map((data, idx) => (
          <PostCard
            session={session}
            key={data.id}
            data={data}
            dataAos={idx % 2 === 0 ? "fade-right" : "fade-left"}
          />
        ))}
      <div ref={ref}></div>
      {pending && <SkeletonCard />}
    </div>
  );
}
