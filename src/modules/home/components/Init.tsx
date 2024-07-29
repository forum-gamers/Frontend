"use client";

import usePost from "@/hooks/usePost";
import type { ChildrenProps } from "@/interfaces";
import type { PostResponse } from "@/interfaces/model";
import { memo, useEffect } from "react";

export interface InitHomePageProps extends ChildrenProps {
  datas: PostResponse[];
}

function InitHomePage({ children, datas }: InitHomePageProps) {
  const { setDatas } = usePost();
  useEffect(() => {
    setDatas(datas);
  }, []);

  return children;
}

export default memo(InitHomePage);
