"use client";

import { memo, Suspense, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GUEST } from "../images";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import TruncateCardText from "./TruncateCardText";
import type { CustomSession } from "@/interfaces";
import useMount from "@/hooks/useMounted";
import FollowBtn from "./FollowBtn";

export interface ProfilePicProps {
  src?: string;
  alt: string;
  username: string;
  id: string;
  bio?: string;
  session?: CustomSession | null;
  isFollowed: boolean;
}

const AvatarPic = memo(
  ({
    src,
    alt,
    username,
  }: Omit<
    ProfilePicProps,
    "bio" | "id" | "isFollowed" | "toggleFollow" | "postId"
  >) => {
    const initials = useMemo(
      () =>
        username
          .split(" ")
          .map((name) => name[0])
          .join(""),
      [username]
    );

    return (
      <Avatar>
        <AvatarImage src={src || GUEST.src} alt={alt} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    );
  }
);
AvatarPic.displayName = "AvatarPic";

function ProfilePicture({
  src,
  alt,
  username,
  id,
  bio,
  session,
  isFollowed,
}: ProfilePicProps) {
  const [open, setOpen] = useState<boolean>(false);

  const trigger = useMemo(
    () => ({
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
    }),
    []
  );

  const mount = useMount();

  return (
    <Popover open={open && !!session && session?.user?.id !== id}>
      <PopoverTrigger {...trigger}>
        <AvatarPic username={username} src={src} alt={alt} />
      </PopoverTrigger>
      {!!session && session?.user?.id !== id && (
        <PopoverContent {...trigger} className="dark:bg-dark-theme-600">
          <article
            data-popover="profile-info-popover"
            className="transition-all duration-200 max-w-[24rem] whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-background p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none dark:bg-dark-theme-500"
          >
            <div className="flex items-center justify-between gap-4 mb-2">
              {mount && (
                <Link href={`/profile/${id}`}>
                  <AvatarPic username={username} src={src} alt={alt} />
                </Link>
              )}
              {session?.user?.id !== id && (
                <Suspense>
                  <FollowBtn id={id} isFollowed={isFollowed} />
                </Suspense>
              )}
            </div>
            <hgroup className="antialiased font-sans">
              <h6 className="flex items-center gap-2 mb-2 text-base font-medium leading-relaxed tracking-normal text-blue-gray-900">
                <span>{username}</span>
              </h6>
              {!!bio && (
                <TruncateCardText
                  text={bio}
                  max={30}
                  className="block text-sm font-normal leading-normal text-neutral-900 dark:text-neutral-300"
                />
              )}
            </hgroup>
          </article>
        </PopoverContent>
      )}
    </Popover>
  );
}

export default memo(ProfilePicture);
