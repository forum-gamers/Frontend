import TruncateCardText from "@/components/common/TruncateCardText";
import Link from "next/link";
import ProfilePic from "@/components/common/ProfilePic";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export interface UserRecomendationCardProps {
  username: string;
  id: string;
  bio?: string;
  imageUrl?: string;
  source: string;
  isFollower: boolean;
}

export default function UserRecomendationCard({
  username,
  id,
  bio,
  imageUrl,
  isFollower,
  source,
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
          />
        )}
      </CardDescription>
      <CardContent className="flex"></CardContent>
    </Card>
  );
}
