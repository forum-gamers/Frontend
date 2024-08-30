import ProfilePic from "@/components/common/ProfilePic";
import Timestamp from "@/components/common/Timestamp";
import TruncateCardText from "@/components/common/TruncateCardText";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { CustomSession } from "@/interfaces";
import type { ReplyResponse } from "@/interfaces/model";
import { memo } from "react";

export interface ReplyCardProps {
  data: ReplyResponse;
  session?: CustomSession | null;
}

function ReplyCard({
  data: { imageUrl, username, bio, userId, createdAt, text },
  session,
}: ReplyCardProps) {
  return (
    <Card data-aos="fade-down" className="w-9/10 ml-12">
      <CardHeader className="flex flex-row gap-2 items-center space-y-0 pb-2">
        <ProfilePic
          src={imageUrl}
          alt={`${username} profile picture`}
          username={username}
          id={userId}
          bio={bio}
          session={session}
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
    </Card>
  );
}

export default memo(ReplyCard);
