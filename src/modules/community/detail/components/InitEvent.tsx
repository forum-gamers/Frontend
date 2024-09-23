"use client";

import type { CommunityEventWithCreator } from "@/interfaces/model";
import useCommunityEvent from "../../hooks/useCommunityEvent";
import { useEffect } from "react";

export interface InitEventProps {
  datas: CommunityEventWithCreator[];
}

export default function InitEvent({ datas }: InitEventProps) {
  const { setDatas, resetDatas } = useCommunityEvent();

  useEffect(() => {
    resetDatas();
    setDatas(datas);
  }, []);
  return null;
}
