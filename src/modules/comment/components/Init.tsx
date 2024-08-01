"use client";

import useComment from "@/modules/comment/hooks/useComment";
import type { ChildrenProps } from "@/interfaces";
import type { CommentResponse } from "@/interfaces/model";
import { memo, useEffect } from "react";

export interface InitCommentProps extends ChildrenProps {
  datas: CommentResponse[];
}

function InitComment({ children, datas }: InitCommentProps) {
  const { setDatas } = useComment();
  useEffect(() => {
    setDatas(datas);
  }, []);

  return children;
}

export default memo(InitComment);
