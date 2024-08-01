"use client";

import type { CustomSession } from "@/interfaces";
import PostCard from "./PostCard";
import usePost from "../hooks/usePost";

export interface PostListProps {
  session: CustomSession | null;
}

export default function PostList({ session }: PostListProps) {
  const { datas } = usePost();

  return (
    <div className="overflow-y-scroll space-y-6 no-scrollbar">
      {!!datas?.length &&
        datas.map((data) => (
          <PostCard session={session} key={data.id} data={data} />
        ))}
    </div>
  );
}
