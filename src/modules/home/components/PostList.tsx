"use client";

import PostCard from "@/components/common/PostCard";
import usePost from "@/hooks/usePost";

export default function PostList() {
  const { datas } = usePost();
  return (
    <div className="overflow-y-scroll space-y-6">
      {!!datas?.length &&
        datas.map((data) => <PostCard key={data.id} data={data} />)}
    </div>
  );
}
