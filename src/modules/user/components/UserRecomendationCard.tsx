import TruncateCardText from "@/components/common/TruncateCardText";
import Link from "next/link";
import ProfilePic from "@/components/common/ProfilePic";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getSourceDescription } from "@/helpers/global";
import type { UserRecomendationSource } from "@/interfaces/model";
import type { Lang } from "@/interfaces";

export interface UserRecomendationCardProps {
  username: string;
  id: string;
  bio?: string;
  imageUrl?: string;
  source: UserRecomendationSource;
  isFollower: boolean;
  lang?: Lang;
}

export default function UserRecomendationCard({
  username,
  id,
  bio,
  imageUrl,
  isFollower,
  source,
  lang = "id",
}: UserRecomendationCardProps) {
  return (
    <Card className="flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 p-4 w-44 mx-auto max-h-28 border rounded-lg">
      <ProfilePic
        username={username}
        bio={bio}
        alt={`${username} image`}
        src={imageUrl}
        id={id}
      />
      <CardDescription className="antialiased">
        <CardTitle
          className="font-display mb-2 text-xl font-semibold"
          itemProp="author"
        >
          <Link href={`/profile/${id}`} prefetch rel="author">
            {username}
          </Link>
        </CardTitle>

        {!!bio && (
          <TruncateCardText
            className="mb-4 prose prose-sm text-gray-400"
            text={bio}
            max={40}
            as="blockquote"
          />
        )}
      </CardDescription>
      <CardContent className="flex">
        {!!source && source !== "non_followed" && (
          <CardDescription>
            {getSourceDescription(source, lang)}
          </CardDescription>
        )}
        {isFollower && (
          <CardDescription>
            {lang === "id" ? "Mengikuti mu" : "Following you"}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
