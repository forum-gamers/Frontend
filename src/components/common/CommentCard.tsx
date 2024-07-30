import type { CommentResponse } from "@/interfaces/model";
import { memo } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import ProfilePic from "./ProfilePic";
import ReplyBtn from "./ReplyBtn";
import TruncateCardText from "./TruncateCardText";
import Timestamp from "./Timestamp";

export interface CommentCardProps {
  data: CommentResponse;
}

function CommentCard({
  data: { text, username, userId, imageUrl, bio, id, createdAt },
}: CommentCardProps) {
  return (
    <Card data-aos="fade-left">
      <CardHeader className="flex flex-row gap-2 items-center space-y-0 pb-2">
        <ProfilePic
          src={imageUrl}
          alt={`${username} profile picture`}
          username={username}
          id={userId}
          bio={bio}
        />
        <hgroup className="antialiased w-full text-xs">
          <p>{username}</p>
          <Timestamp timestamp={createdAt} />
        </hgroup>
      </CardHeader>
      <CardContent className="mt-4">
        <TruncateCardText
          text={text}
          className="text-lg leading-relaxed mb-6"
        />
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <ReplyBtn commentId={id} userId={userId} />
      </CardFooter>
    </Card>
  );
}

export default memo(CommentCard);
