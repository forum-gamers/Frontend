"use client";

import type { UserAttributes } from "@/interfaces/model";
import { useEffect } from "react";
import useTargetProfile from "../hooks/useTargetProfile";
import type { CustomSession } from "@/interfaces";

export interface InitProps {
  target: UserAttributes | null;
  session: CustomSession | null;
}

export default function Init({ target, session }: InitProps) {
  const { setTarget } = useTargetProfile();

  useEffect(() => {
    if (target && session?.user?.id !== target?.id) setTarget(target);
  }, [session, target]);

  return null;
}
