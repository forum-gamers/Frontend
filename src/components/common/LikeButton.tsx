"use client";

import { HeartIcon } from "../icons/HeroIconsSolid";
import { Button, type ButtonProps } from "../ui/button";
import { memo, useOptimistic, type MouseEventHandler } from "react";
import { likePost, unlikePost } from "@/actions/post";
import usePost from "@/hooks/usePost";

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
  const { updateLike } = usePost();
  const [liked, optimisticLiked] = useOptimistic(
    isLiked,
    (prev: boolean) => !prev
  );

  const clickHandler: MouseEventHandler = async (e) => {
    e.preventDefault();

    optimisticLiked(liked);

    isLiked ? await unlikePost(postId) : await likePost(postId);

    updateLike(postId);
  };

  return (
    <Button
      {...rest}
      onClick={clickHandler}
      variant="ghost"
      className={className}
    >
      <HeartIcon
        className={`h-6 w-6 text-[#EE2924] ${
          liked ? "text-[#EE2924]" : "text-transparent stroke-[#EE2924]"
        }`}
      />{" "}
      <span>{totalLike}</span>
    </Button>
  );
}

export default memo(PostLikeButton);
