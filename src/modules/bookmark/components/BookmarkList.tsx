"use client";

import type { CustomSession } from "@/interfaces";
import PostCard from "@/modules/home/components/PostCard";
import useScrollPost from "@/modules/home/hooks/useScrollPost";
import SkeletonCard from "@/components/common/SkeletonCard";
import useBookmark from "../hooks/useBookmark";
import { fetchBookmark } from "../action";

export interface PostListProps {
  session: CustomSession | null;
}

export default function BookmarkList({ session }: PostListProps) {
  const { datas, ref, pending } = useScrollPost<HTMLDivElement>(
    useBookmark,
    fetchBookmark
  );

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
