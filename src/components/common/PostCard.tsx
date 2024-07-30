import type { PostResponse } from "@/interfaces/model";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import TruncateCardText from "./TruncateCardText";
import LazyLoadImg from "./LazyLoadImage";
import { memo } from "react";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import ProfilePic from "./ProfilePic";
import Timestamp from "./Timestamp";

export interface PostCardProps {
  data: PostResponse;
}

function PostCard({
  data: {
    username,
    userImageUrl,
    createdAt,
    text,
    medias,
    id,
    userId,
    isLiked,
    userBio,
    countLike,
    countComment,
  },
}: PostCardProps) {
  return (
    <Card data-aos="fade-left">
      <CardHeader className="flex flex-row gap-2 items-center space-y-0 pb-2">
        <ProfilePic
          bio={userBio}
          src={userImageUrl}
          alt={`${username} profile picture`}
          username={username}
          id={userId}
        />
        <hgroup className="w-full text-xs antialiased">
          <p>{username || "GUEST"}</p>
          <Timestamp timestamp={createdAt} />
        </hgroup>
      </CardHeader>
      <CardContent className="mt-4">
        {!!text && <TruncateCardText text={text} />}
        {!!medias.length && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8">
            {medias.map((el) => (
              <LazyLoadImg
                className="py-1 hover:scale-105"
                key={el.fileId}
                src={el.url}
                alt="post image"
                width={400}
                height={300}
              />
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <LikeButton
          totalLike={countLike}
          postId={id}
          isLiked={isLiked}
          className="hover:bg-slate-200 gap-2"
        />
        <CommentButton
          countComment={countComment}
          postId={id}
          className="hover:bg-slate-200 gap-2"
        />
      </CardFooter>
    </Card>
  );
}

export default memo(PostCard);
