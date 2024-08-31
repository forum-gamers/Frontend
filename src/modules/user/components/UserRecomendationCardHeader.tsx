"use client";

import ProfilePic from "@/components/common/ProfilePic";
import type { UserRecomendationCardProps } from "./UserRecomendationCard";
import useRecomendation from "../hooks/useRecomendation";
import { memo, useCallback } from "react";
import usePost from "@/modules/home/hooks/usePost";

export type UserRecomendationCardHeaderProps = Pick<
  UserRecomendationCardProps,
  "username" | "imageUrl" | "isFollower" | "id" | "bio" | "session"
>;

function UserRecomendationCardHeader({
  username,
  id,
  imageUrl,
  isFollower,
  session,
  bio,
}: UserRecomendationCardHeaderProps) {
  const { updateFollow } = useRecomendation();
  const { toogleFollow } = usePost();

  const handleFollowBtn = useCallback(() => {
    updateFollow(id);
    toogleFollow(id);
  }, [isFollower, id]);

  return (
    <ProfilePic
      username={username}
      bio={bio}
      alt={`${username} image`}
      src={imageUrl}
      id={id}
      session={session}
      isFollowed={isFollower}
      toggleFollow={handleFollowBtn}
    />
  );
}

export default memo(UserRecomendationCardHeader);
