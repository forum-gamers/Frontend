import ProfilePic, {
  type ProfilePicProps,
} from "@/components/common/ProfilePic";
import { memo } from "react";

export interface MemberCardProps extends ProfilePicProps {}

function MemberCard({
  username,
  src,
  alt,
  id,
  bio,
  session,
  isFollowed = false,
  backgroundUrl,
  createdAt,
}: MemberCardProps) {
  return (
    <article className="flex items-center space-x-4">
      <ProfilePic
        username={username}
        src={src}
        alt={alt}
        isFollowed={isFollowed}
        id={id}
        session={session}
        backgroundUrl={backgroundUrl}
        createdAt={createdAt}
        bio={bio}
      />
    </article>
  );
}

export default memo(MemberCard);
