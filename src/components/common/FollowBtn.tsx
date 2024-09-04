"use client";

import {
  memo,
  useCallback,
  useOptimistic,
  useTransition,
  type MouseEventHandler,
} from "react";
import { Button } from "../ui/button";
import useProfile from "@/modules/user/hooks/useProfile";
import { follow, unFollow } from "@/modules/user/action";
import { cn } from "@/lib/utils";
import useRecomendation from "@/modules/user/hooks/useRecomendation";
import usePost from "@/modules/home/hooks/usePost";
import useComment from "@/modules/comment/hooks/useComment";

export interface FollowBtnProps {
  isFollowed: boolean;
  id: string;
  className?: string;
}

function FollowBtn({ isFollowed, id, className = "" }: FollowBtnProps) {
  const { updateFollow } = useRecomendation();
  const { toogleFollow: postToggle } = usePost();
  const { toggleFollow: commentToggle } = useComment();

  const [pending, startTransition] = useTransition();

  const [optimisticIsFollowed, optimisticIsFollowedHandler] = useOptimistic(
    isFollowed,
    (newState: boolean) => newState
  );
  const { updateUserFollowing } = useProfile();

  const handleFollowBtn: MouseEventHandler = useCallback(
    (e) => {
      startTransition(async () => {
        optimisticIsFollowedHandler(!isFollowed);
        isFollowed ? await unFollow(id) : await follow(id);
        updateUserFollowing(isFollowed ? "decrement" : "increment");
        updateFollow(id);
        postToggle(id);
        commentToggle(id);
      });
    },
    [isFollowed, id]
  );

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
