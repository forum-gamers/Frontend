"use client";

import type { GetTeamDto } from "@/interfaces/model";
import useTeam from "../hooks/useTeam";
import { useEffect } from "react";

export interface InitProps {
  datas: GetTeamDto[];
}

export default function InitPage({ datas }: InitProps) {
  const { setDatas, resetDatas } = useTeam();

  useEffect(() => {
    resetDatas();
    setDatas(datas);
  }, []);

  return null;
}
