"use client";

import type { CommentResponse } from "@/interfaces/model";
import { memo, useState, type MouseEventHandler } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";
import ProfilePic from "../../../components/common/ProfilePic";
import ReplyBtn from "./ReplyBtn";
import TruncateCardText from "../../../components/common/TruncateCardText";
import Timestamp from "../../../components/common/Timestamp";
import { Button } from "@/components/ui/button";
import ReplyCard from "./ReplyCard";
import type { CustomSession } from "@/interfaces";

export interface CommentCardProps {
  data: CommentResponse;
  session?: CustomSession | null;
}

function CommentCard({
  data: { text, username, userId, imageUrl, bio, id, createdAt, replies },
  session,
}: CommentCardProps) {
  const [open, setOpen] = useState<boolean>(false);

  const onCLickHandler: MouseEventHandler = (e) => setOpen(!open);

  return (
    <>
      <Card data-aos="fade-left">
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
        <CardFooter className="flex justify-between items-center">
          <ReplyBtn commentId={id} userId={userId} />
          {!!replies?.length && (
            <Button
              variant="ghost"
              onClick={onCLickHandler}
              className="transition-all duration-100"
            >
              {open ? "Hide " : "See "} Reply
            </Button>
          )}
        </CardFooter>
      </Card>
      {open && (
        <div className="mt-4 space-y-6">
          {replies.map((el) => (
            <ReplyCard session={session} key={el.id} data={el} />
          ))}
        </div>
      )}
    </>
  );
}

export default memo(CommentCard);
