"use client";

import usePost from "../hooks/usePost";
import type { ChildrenProps } from "@/interfaces";
import type { PostResponse } from "@/interfaces/model";
import useComment from "@/modules/comment/hooks/useComment";
import { memo, useEffect } from "react";

export interface InitHomePageProps extends ChildrenProps {
  datas: PostResponse[];
}

function InitHomePage({ children, datas }: InitHomePageProps) {
  const { setDatas } = usePost();
  const { resetData } = useComment();
  useEffect(() => {
    setDatas(datas);
    resetData();
  }, []);

  return children;
}

export default memo(InitHomePage);
