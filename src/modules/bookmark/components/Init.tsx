"use client";

import type { ChildrenProps } from "@/interfaces";
import type { PostResponse } from "@/interfaces/model";
import { useEffect } from "react";
import useBookmark from "../hooks/useBookmark";

export interface InitPageProps extends ChildrenProps {
  datas: PostResponse[];
}

export default function InitPage({ children, datas }: InitPageProps) {
  /**
   * TODO
   * update state when user un bookmark post
   * case when bookmark a post and redirect to /bookmark for first time,all ok
   * but the problem happen when u unbookmark a post on /bookmark
   * when you go back to / and back to /bookmark again
   * the unbookmarked post still exists
   * its seems the zustand state doesnt updated or the page is being cached by next js
   */
  const { setDatas, resetDatas } = useBookmark();
  useEffect(() => {
    resetDatas();
    setDatas(datas);
  }, []);

  return children;
}
