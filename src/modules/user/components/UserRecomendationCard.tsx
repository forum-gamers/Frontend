import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getSourceDescription } from "@/helpers/global";
import type { UserRecomendationSource } from "@/interfaces/model";
import type { CustomSession, Lang } from "@/interfaces";
import { memo } from "react";
import UserRecomendationCardHeader from "./UserRecomendationCardHeader";

export interface UserRecomendationCardProps {
  username: string;
  id: string;
  bio?: string;
  imageUrl?: string;
  source: UserRecomendationSource;
  isFollower: boolean;
  lang?: Lang;
  session?: CustomSession | null;
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
}: UserRecomendationCardProps) {
  return (
    <Card className="flex bg-white dark:bg-dark-theme-500 flex-col w-[90%] overflow-x-hidden px-2 items-center justify-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 m-auto max-h-16 h-16 border rounded-lg">
      <UserRecomendationCardHeader
        username={username}
        bio={bio}
        imageUrl={imageUrl}
        id={id}
        session={session}
        isFollower={isFollower}
      />
      <hgroup className="antialiased flex flex-col w-full">
        <CardTitle
          className="font-display mb-2 font-semibold text-xs"
          itemProp="author"
        >
          <Link href={`/profile/${id}`} prefetch rel="author">
            {username}
          </Link>
        </CardTitle>
        {!!source && source !== "non_followed" && (
          <CardDescription className="text-xs">
            {getSourceDescription(source, lang)}
          </CardDescription>
        )}
        {isFollower && (
          <CardDescription className="text-xs block">
            {lang === "id" ? "Mengikutimu" : "Followingyou"}
          </CardDescription>
        )}
      </hgroup>
      <CardContent className="flex flex-col text-xs"></CardContent>
    </Card>
  );
}

export default memo(UserRecomendationCard);
