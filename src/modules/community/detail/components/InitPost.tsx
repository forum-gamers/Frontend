"use client";

import type { PostResponse } from "@/interfaces/model";
import { useEffect } from "react";
import useCommunityPost from "../../hooks/useCommunityPost";

export interface InitProps {
  datas: PostResponse[];
}

export default function Init({ datas }: InitProps) {
  const { setDatas, resetDatas } = useCommunityPost();
  useEffect(() => {
    resetDatas();
    setDatas(datas);
  }, []);

  return null;
}
