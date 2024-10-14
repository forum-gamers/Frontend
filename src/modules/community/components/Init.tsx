"use client";

import type { CommunityListAttributes } from "@/interfaces/model";
import useCommunity from "../hooks/useCommunity";
import { useEffect } from "react";

export interface InitProps {
  datas: CommunityListAttributes[];
}

export default function Init({ datas }: InitProps) {
  const { setDatas } = useCommunity();

  useEffect(() => {
    setDatas(datas);
  }, []);

  return null;
}
