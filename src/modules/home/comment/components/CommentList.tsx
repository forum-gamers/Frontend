"use client";

import CommentCard from "@/components/common/CommentCard";
import useComment from "@/hooks/useComment";

export default function CommentList() {
  const { datas } = useComment();

  return (
    <div className="overflow-y-scroll space-y-6">
      {!!datas?.length &&
        datas.map((el) => <CommentCard key={el.id} data={el} />)}
    </div>
  );
}
