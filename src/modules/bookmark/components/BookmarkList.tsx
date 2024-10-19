"use client";

import type { CustomSession } from "@/interfaces";
import PostCard from "@/modules/feed/components/PostCard";
import useScroll from "@/hooks/useScroll";
import SkeletonCard from "@/components/common/SkeletonCard";
import useBookmark from "../hooks/useBookmark";
import { fetchBookmark } from "../action";
import type { PostResponse } from "@/interfaces/model";
import NoDataState from "@/components/common/NoDataState";

export interface PostListProps {
  session: CustomSession | null;
}

export default function BookmarkList({ session }: PostListProps) {
  const { datas, ref, pending } = useScroll<HTMLDivElement, PostResponse>(
    useBookmark,
    fetchBookmark
  );

  return (
    <div className="overflow-y-scroll space-y-6 no-scrollbar">
      {!!datas?.length ? (
        datas.map((data, idx) => (
          <PostCard
            session={session}
            key={data.id}
            data={data}
            dataAos={idx % 2 === 0 ? "fade-right" : "fade-left"}
          />
        ))
      ) : (
        <NoDataState />
      )}
      <div ref={ref}></div>
      {pending && <SkeletonCard />}
    </div>
  );
}
