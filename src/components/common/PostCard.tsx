import type { PostResponse } from "@/interfaces/model";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GUEST } from "../images";
import { differenceInHours, differenceInDays } from "date-fns";

export interface PostCardProps {
  data: PostResponse;
}

export default function PostCard({
  data: { username, userImageUrl, createdAt, ...rest },
}: PostCardProps) {
  console.log(rest);
  let date = new Date(createdAt);
  let time = differenceInDays(new Date(), date);

  if (time < 1) time = differenceInHours(new Date(), date);

  return (
    <Card data-aos="fade-left">
      <CardHeader className="flex flex-row gap-2 items-center space-y-0 pb-2">
        <Avatar>
          <AvatarImage>
            <AvatarImage
              src={userImageUrl || GUEST.src}
              alt={`${username} avatar`}
            />
            <AvatarFallback>
              {username.split(" ")?.[0]?.[0]}
              {username.split(" ")?.[1]?.[0] || "GUEST"}
            </AvatarFallback>
          </AvatarImage>
        </Avatar>
        <hgroup className="w-full text-xs">
          <p>{username || "GUEST"}</p>
          <p>{Math.abs(time)}</p>
        </hgroup>
      </CardHeader>
      <CardContent className="mt-4"></CardContent>
    </Card>
  );
}
