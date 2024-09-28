import ProfilePic from "@/components/common/ProfilePic";
import type { CustomSession } from "@/interfaces";
import type { GetTeamMemberAttributes } from "@/interfaces/model";
import { cn } from "@/lib/utils";
import { memo } from "react";

export interface MemberCardProps {
  data: GetTeamMemberAttributes;
  session: CustomSession | null;
}

function MemberCard({ data, session }: MemberCardProps) {
  return (
    <article
      className={cn(
        "flex items-center mb-4 last:mb-0 h-[3.5rem] justify-start gap-2 w-[6.5rem] p-[0.35rem]",
        "bg-white dark:bg-[#202225] dark:border-black overflow-x-hidden border rounded-lg",
        "shadow-lg stroke-slate-50 dark:stroke-slate-800 shadow-gray-100 dark:shadow-gray-900",
        "hover:shadow-gray-200 dark:hover:shadow-slate-950 hover:opacity-85 hover:scale-[102.5%]",
        "transition-all duration-100 overflow-hidden w-full"
      )}
    >
      <ProfilePic
        src={data.imageUrl}
        username={data.username}
        session={session}
        alt={`${data.username} image`}
        id={data.userId}
        bio={data.userBio}
        isFollowed={data.isFollowed}
        backgroundUrl={data.userBackgroundImageUrl}
        createdAt={data.userCreatedAt}
      />
      <hgroup className="text-neutral-900 dark:text-neutral-300">
        <p className="font-medium">{data.username}</p>
        <p className="text-sm text-muted-foreground">{data.role}</p>
      </hgroup>
    </article>
  );
}

export default memo(MemberCard);
