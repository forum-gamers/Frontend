"use client";

import CommentCard from "./CommentCard";
import useComment from "@/modules/comment/hooks/useComment";

export default function CommentList() {
  const { datas } = useComment();

  return (
    <div className="overflow-y-scroll space-y-6 no-scrollbar">
      {!!datas?.length &&
        datas.map((el) => <CommentCard key={el.id} data={el} />)}
    </div>
  );
}
