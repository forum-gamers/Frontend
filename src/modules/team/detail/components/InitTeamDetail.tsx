"use client";

import type { GetTeamDto } from "@/interfaces/model";
import { useEffect } from "react";
import useTargetTeam from "../hooks/useTargetTeam";

export interface InitTeamDetailProps {
  data: GetTeamDto;
}

export default function InitTeamDetail({ data }: InitTeamDetailProps) {
  const { setData, resetData } = useTargetTeam();
  useEffect(() => {
    resetData();
    setData(data);
  }, []);

  return null;
}
