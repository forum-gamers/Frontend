"use client";

import { memo, Suspense, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BACKDROP, GUEST } from "../images";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import TruncateCardText from "./TruncateCardText";
import type { CustomSession } from "@/interfaces";
import useMount from "@/hooks/useMounted";
import FollowBtn from "./FollowBtn";
import LazyLoadImg from "./LazyLoadImage";
import Timestamp from "./Timestamp";

export interface ProfilePicProps {
  src?: string;
  alt: string;
  username: string;
  id: string;
  bio?: string;
  session?: CustomSession | null;
  isFollowed: boolean;
  backgroundUrl?: string;
  createdAt: Date | string;
}

const AvatarPic = memo(
  ({
    src,
    alt,
    username,
  }: Omit<
    ProfilePicProps,
    "bio" | "id" | "isFollowed" | "toggleFollow" | "postId" | "createdAt"
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
        <AvatarImage
          className="rounded-full bg-white"
          src={src || GUEST.src}
          alt={alt}
        />
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
  backgroundUrl,
  createdAt,
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
        <PopoverContent {...trigger} asChild>
          <article
            data-popover="profile-info-popover"
            className="transition-all duration-200 max-w-[24rem] sm:max-w-[425px] p-0 whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-background font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none bg-white dark:bg-gray-800"
          >
            <header className="relative h-36">
              <LazyLoadImg
                src={backgroundUrl || BACKDROP}
                alt="Profile banner"
                className="object-cover"
                width={385}
                height={200}
              />
            </header>
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
            <hgroup className="antialiased font-sans space-y-2">
              <h2 className="flex items-center mt-4 gap-2 mb-2 font-medium leading-relaxed tracking-normal text-neutral-900 dark:text-neutral-300 text-sm text-muted-foreground">
                <span>{username}</span>
              </h2>

              <div className="mt-4 space-y-1">
                <h3 className="font-semibold">Member Since</h3>
                <Timestamp
                  as="h6"
                  timestamp={createdAt}
                  className="flex items-center gap-2 mb-2 font-medium leading-relaxed tracking-normal text-neutral-900 dark:text-neutral-300 text-sm text-muted-foreground"
                />
              </div>
              {!!bio && (
                <TruncateCardText
                  text={bio}
                  max={30}
                  hideBtn
                  className="block font-normal mt-4 leading-normal text-neutral-900 dark:text-neutral-300 text-sm text-muted-foreground"
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
