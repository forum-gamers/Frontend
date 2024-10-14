"use client";

import type { CommunityListAttributes } from "@/interfaces/model";
import { useEffect } from "react";
import useTargetCommunity from "../../hooks/useTargetCommunity";

export interface InitPageProps {
  data: CommunityListAttributes;
}

export default function InitPage({ data }: InitPageProps) {
  const { setDatas, resetDatas } = useTargetCommunity();
  useEffect(() => {
    resetDatas();
    setDatas(data);
  }, []);

  return null;
}
