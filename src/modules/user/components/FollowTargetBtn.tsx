"use client";

import { memo } from "react";
import useTargetProfile from "../hooks/useTargetProfile";
import FollowBtn from "@/components/common/FollowBtn";
import { cn } from "@/lib/utils";

function FollowTargetBtn() {
  const { target } = useTargetProfile();

  return (
    <FollowBtn
      isFollowed={target?.isFollower ?? false}
      id={target?.id ?? ""}
      className={cn(
        "ml-4 px-4 py-2",
        !target && "animate-pulse duration-100 opacity-75"
      )}
    />
  );
}

export default memo(FollowTargetBtn);
