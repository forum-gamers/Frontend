"use client";

import { HeartIcon } from "lucide-react";
import { Button, type ButtonProps } from "../../../components/ui/button";
import {
  memo,
  useCallback,
  useOptimistic,
  useTransition,
  type MouseEventHandler,
} from "react";
import { likePost, unlikePost } from "../action";
import usePost from "../hooks/usePost";

export interface PostLikeButtonProps extends ButtonProps {
  className?: string;
  postId: number;
  isLiked: boolean;
  totalLike: number;
}

function PostLikeButton({
  className,
  postId,
  isLiked,
  totalLike,
  ...rest
}: PostLikeButtonProps) {
  const [pending, startTransition] = useTransition();
  const { updateLike } = usePost();
  const [liked, optimisticLiked] = useOptimistic(
    isLiked,
    (prev: boolean) => !prev
  );
  const [count, optimisticCount] = useOptimistic(
    totalLike,
    (prev: number) => prev + (isLiked ? -1 : 1)
  );

  const clickHandler: MouseEventHandler = useCallback(
    async (e) => {
      e.preventDefault();
      startTransition(async () => {
        optimisticLiked(liked);
        optimisticCount(count);
        isLiked ? await unlikePost(postId) : await likePost(postId);

        updateLike(postId);
      });
    },
    [
      postId,
      liked,
      count,
      updateLike,
      optimisticLiked,
      optimisticCount,
      startTransition,
      isLiked,
    ]
  );

  return (
    <Button
      {...rest}
      onClick={clickHandler}
      variant="ghost"
      className={className}
      disabled={pending}
    >
      <HeartIcon
        fill={liked ? "red" : "transparent"}
        className={`h-6 w-6 text-[#EE2924] ${
          liked ? "text-[#EE2924]" : "text-transparent stroke-[#EE2924]"
        }`}
      />{" "}
      <span>{count}</span>
    </Button>
  );
}

export default memo(PostLikeButton);
