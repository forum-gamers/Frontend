"use client";

import {
  memo,
  useCallback,
  useMemo,
  useState,
  useTransition,
  type MouseEventHandler,
} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GUEST } from "../images";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import TruncateCardText from "./TruncateCardText";
import type { CustomSession } from "@/interfaces";
import { Button } from "../ui/button";
import { follow, unFollow } from "@/modules/user/action";

export interface ProfilePicProps {
  src?: string;
  alt: string;
  username: string;
  id: string;
  bio?: string;
  session?: CustomSession | null;
  isFollowed: boolean;
  toggleFollow: () => void;
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
  toggleFollow,
}: ProfilePicProps) {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false);

  const trigger = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
  };

  const handleFollowBtn: MouseEventHandler = useCallback(
    (e) => {
      startTransition(async () => {
        isFollowed ? await unFollow(id) : await follow(id);
        toggleFollow();
      });
    },
    [id, session, username, isFollowed]
  );

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
              <Link prefetch href={`/profile/${id}`} passHref>
                <AvatarPic username={username} src={src} alt={alt} />
              </Link>
              {session?.user?.id !== id && (
                <Button
                  onClick={handleFollowBtn}
                  disabled={!session || pending}
                  className="hover:cursor-pointer hover:scale-105 select-none rounded-lg bg-light-theme-100 hover:bg-light-theme-200 dark:bg-dark-theme-300 hover:dark:bg-dark-theme-200 transition-colors duration-100 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>
            <hgroup className="antialiased font-sans">
              <h6 className="flex items-center gap-2 mb-2 text-base font-medium leading-relaxed tracking-normal text-blue-gray-900">
                <span>{username}</span>
              </h6>
              {!!bio && (
                <TruncateCardText
                  text={bio}
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
