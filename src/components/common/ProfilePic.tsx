"use client";

import { memo, Suspense, useMemo, useRef, useState } from "react";
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
import { cn } from "@/lib/utils";

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
    withBackground = false,
  }: Omit<
    ProfilePicProps,
    "bio" | "id" | "isFollowed" | "toggleFollow" | "postId" | "createdAt"
  > & { withBackground?: boolean }) => {
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
          className={cn(
            "rounded-full",
            withBackground
              ? "bg-slate-200 dark:bg-slate-800 shadow-sm shadow-slate-400 dark:shadow-slate-900 stroke-white dark:stroke-black"
              : "bg-inherit"
          )}
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
  const timeOutRef = useRef<Timer | null>(null);

  const trigger = useMemo(
    () => ({
      onMouseEnter: () => {
        if (timeOutRef.current) clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => setOpen(true), 100);
      },
      onMouseLeave: () => {
        if (timeOutRef.current) clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => setOpen(false), 100);
      },
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
            className={cn(
              "shadow-lg shadow-slate-400 dark:shadow-slate-900 focus:outline-none bg-white dark:bg-[#202225] stroke-white dark:stroke-black",
              "max-w-[24rem] sm:max-w-[425px] p-0 whitespace-normal break-words rounded-lg border bg-background font-sans text-sm font-normal",
              "hover:shadow-xl transition-all duration-200 hover:z-50 border-2"
            )}
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
                  <AvatarPic
                    withBackground
                    username={username}
                    src={src}
                    alt={alt}
                  />
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
