"use client";

import { useEffect } from "react";
import useMember from "../hooks/useMember";
import type { GetTeamMemberAttributes } from "@/interfaces/model";

export interface InitMemberSectionProps {
  datas: GetTeamMemberAttributes[];
}

export default function InitMemberSection({ datas }: InitMemberSectionProps) {
  const { setDatas, resetDatas } = useMember();

  useEffect(() => {
    resetDatas();
    setDatas(datas);
  }, []);

  return null;
}
