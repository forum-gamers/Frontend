"use client";

import { memo } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import useFollowBtn from "@/hooks/useFollowBtn";

export interface FollowBtnProps {
  isFollowed: boolean;
  id: string;
  className?: string;
}

function FollowBtn({ isFollowed, id, className = "" }: FollowBtnProps) {
  const { pending, optimisticIsFollowed, handleFollowBtn } = useFollowBtn({
    id,
    isFollowed,
  });

  return (
    <Button
      onClick={handleFollowBtn}
      disabled={pending}
      className={cn(
        "hover:cursor-pointer hover:scale-105 select-none rounded-lg py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md",
        className,
        "bg-light-theme-100 hover:bg-light-theme-200 dark:bg-dark-theme-300 hover:dark:bg-dark-theme-200",
        "transition-colors duration-100",
        "shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      )}
    >
      {optimisticIsFollowed ? "Unfollow" : "Follow"}
    </Button>
  );
}

export default memo(FollowBtn);
