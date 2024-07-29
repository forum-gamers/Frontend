"use client";

import useComment from "@/hooks/useComment";

export default function CommentList() {
  const { datas } = useComment();

  return <div className="overflow-y-scroll space-y-6"></div>;
}
