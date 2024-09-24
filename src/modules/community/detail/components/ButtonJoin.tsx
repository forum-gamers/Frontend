"use client";

import {
  memo,
  useCallback,
  useOptimistic,
  useTransition,
  type MouseEventHandler,
} from "react";
import useTargetCommunity from "../../hooks/useTargetCommunity";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CustomSession } from "@/interfaces";
import { joinCommunity, leaveCommunity } from "../../action";

export interface ButtonJoinProps {
  session: CustomSession | null;
  communityId: number;
}

function ButtonJoin({ session, communityId }: ButtonJoinProps) {
  const [pending, startTransition] = useTransition();
  const { data, setDatas } = useTargetCommunity();
  const [isMember, optimisticHandler] = useOptimistic(
    data?.isMember ?? false,
    (prev: boolean) => !prev
  );

  const onClickHandler: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      startTransition(async () => {
        optimisticHandler(isMember);
        isMember
          ? await leaveCommunity(communityId)
          : await joinCommunity(communityId);

        if (data)
          setDatas({
            ...data,
            isMember: !isMember,
            totalMember: data.totalMember + (isMember ? -1 : 1),
          });
      });
    },
    [isMember]
  );

  return (
    <Button
      onClick={onClickHandler}
      disabled={
        data?.role === "owner" || session?.user?.id === data?.owner || pending
      }
      className={cn(
        isMember
          ? "border-2 border-blue-500 hover:border-blue-600 bg-white hover:bg-gray-50 dark:bg-[#202225] dark:hover:bg-slate-900"
          : "bg-blue-500 hover:bg-blue-600",
        "text-neutral-900 dark:text-neutral-300 w-40",
        "transition-all duration-300 hover:opacity-75 hover:scale-[98.5%]"
      )}
    >
      {isMember ? "Leave Community" : "Join Community"}
    </Button>
  );
}

export default memo(ButtonJoin);
