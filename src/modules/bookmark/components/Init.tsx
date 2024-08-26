"use client";

import type { ChildrenProps } from "@/interfaces";
import { useEffect, useTransition } from "react";
import useBookmark from "../hooks/useBookmark";
import { usePathname } from "next/navigation";
import { fetchBookmark } from "../action";

export interface InitPageProps extends ChildrenProps {}

export default function InitPage({ children }: InitPageProps) {
  const { setDatas } = useBookmark();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      //TODO: Update this after found a way to cancel next js page cache
      const { data = [] } = await fetchBookmark({});
      setDatas(data);
    });
  }, [pathname]);

  return children;
}
