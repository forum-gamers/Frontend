"use client";

import PostCard from "@/components/common/PostCard";
import usePost from "@/hooks/usePost";

export default function PostList() {
  const { datas } = usePost();
  return (
    <section className="overflow-y-scroll">
      {!!datas.length &&
        datas.map((data) => <PostCard key={data.id} data={data} />)}
    </section>
  );
}
