"use client";

import SkeletonCard from "@/components/common/SkeletonCard";
import useScrollComment from "../hooks/useScrollComment";
import CommentCard from "./CommentCard";
import type { CustomSession } from "@/interfaces";

export interface CommentListProps {
  postId: number;
  session: CustomSession | null;
}

export default function CommentList({ postId, session }: CommentListProps) {
  const { datas, ref, pending } = useScrollComment<HTMLDivElement>({ postId });

  return (
    <div className="overflow-y-scroll space-y-6 no-scrollbar">
      {!!datas?.length &&
        datas.map((el) => (
          <CommentCard session={session} key={el.id} data={el} />
        ))}
      <div ref={ref}></div>
      {pending && <SkeletonCard />}
    </div>
  );
}
