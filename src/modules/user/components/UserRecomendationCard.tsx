import Link from "next/link";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { getSourceDescription } from "@/helpers/global";
import type { UserRecomendationSource } from "@/interfaces/model";
import type { CustomSession, Lang } from "@/interfaces";
import { memo } from "react";
import ProfilePic from "@/components/common/ProfilePic";
import { cn } from "@/lib/utils";

export interface UserRecomendationCardProps {
  username: string;
  id: string;
  bio?: string;
  imageUrl?: string;
  source?: UserRecomendationSource;
  isFollower: boolean;
  lang?: Lang;
  createdAt: Date | string;
  session?: CustomSession | null;
  backgroundUrl?: string;
}

function UserRecomendationCard({
  username,
  id,
  bio,
  imageUrl,
  isFollower,
  source,
  lang = "id",
  session,
  createdAt,
  backgroundUrl,
}: UserRecomendationCardProps) {
  return (
    <Card
      className={cn(
        "flex bg-white dark:bg-[#202225] dark:border-black w-[90%] overflow-x-hidden px-2 items-center justify-start flex-row space-x-6 m-auto max-h-16 h-16 border rounded-lg",
        "shadow-lg stroke-slate-50 dark:stroke-slate-800 shadow-gray-100 dark:shadow-gray-900",
        "hover:shadow-gray-200 dark:hover:shadow-slate-950 hover:opacity-85 hover:scale-[102.5%]",
        "transition-all duration-100"
      )}
    >
      <ProfilePic
        username={username}
        bio={bio}
        alt={`${username} image`}
        src={imageUrl}
        id={id}
        session={session}
        isFollowed={isFollower}
        createdAt={createdAt}
        backgroundUrl={backgroundUrl}
      />
      <hgroup className="antialiased flex flex-col w-full">
        <CardTitle
          className="font-display mb-2 font-semibold text-xs"
          itemProp="author"
        >
          <Link href={`/profile/${id}`}>{username}</Link>
        </CardTitle>
        {!!source && source !== "non_followed" && (
          <CardDescription className="text-xs">
            {getSourceDescription(source, lang)}
          </CardDescription>
        )}
      </hgroup>
    </Card>
  );
}

export default memo(UserRecomendationCard);
