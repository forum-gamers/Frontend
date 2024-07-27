import type { PostResponse } from "@/interfaces/model";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GUEST } from "../images";
import { differenceInHours, differenceInDays } from "date-fns";
import TruncateCardText from "./TruncateCardText";
import LazyLoadImg from "./LazyLoadImage";
import { Heart, MessageSquareMore } from "lucide-react";
import { Button } from "../ui/button";
import { memo } from "react";
import LikeButton from "./LikeButton";

export interface PostCardProps {
  data: PostResponse;
}

function PostCard({
  data: { username, userImageUrl, createdAt, text, medias, id, isLiked },
}: PostCardProps) {
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
          postId={id}
          isLiked={isLiked}
          className="hover:bg-slate-200 gap-2"
        />
        <Button variant="ghost" className="hover:bg-slate-200 gap-2">
          <MessageSquareMore /> Comment
        </Button>
      </CardFooter>
    </Card>
  );
}

export default memo(PostCard);
