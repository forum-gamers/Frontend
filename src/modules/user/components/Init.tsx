"use client";

import type { UserAttributes } from "@/interfaces/model";
import { useEffect } from "react";
import useTargetProfile from "../hooks/useTargetProfile";
import type { CustomSession } from "@/interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface InitProps {
  target: UserAttributes | null;
}

export default function Init({ target }: InitProps) {
  const { setTarget } = useTargetProfile();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (target) setTarget(target);
  }, [target]);

  useEffect(() => {
    if (
      status !== "loading" &&
      (session as CustomSession)?.user?.id === target?.id
    ) {
      setTarget(null);
      router.replace("/profile");
    }
  }, [status, target, session]);

  return null;
}
