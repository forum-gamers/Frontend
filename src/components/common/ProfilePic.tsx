"use client";

import { memo, useMemo, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { GUEST } from "../images";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";
import TruncateCardText from "./TruncateCardText";

export interface ProfilePicProps {
  src?: string;
  alt: string;
  username: string;
  id: string;
  bio?: string;
}

const AvatarPic = memo(
  ({ src, alt, username }: Omit<ProfilePicProps, "bio" | "id">) => {
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

function ProfilePicture({ src, alt, username, id, bio }: ProfilePicProps) {
  const [open, setOpen] = useState<boolean>(false);

  const trigger = {
    onMouseEnter: () => setOpen(true),
    onMouseLeave: () => setOpen(false),
  };

  return (
    <Popover open={open}>
      <PopoverTrigger {...trigger}>
        <AvatarPic username={username} src={src} alt={alt} />
      </PopoverTrigger>
      <PopoverContent {...trigger}>
        <article
          data-popover="profile-info-popover"
          className="transition-all duration-200 max-w-[24rem] whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-background p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
        >
          <div className="flex items-center justify-between gap-4 mb-2">
            <AvatarPic username={username} src={src} alt={alt} />
            <Link
              prefetch
              href={`/profile/${id}`}
              className="hover:cursor-pointer select-none rounded-lg bg-gray-900 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Go To Profile
            </Link>
          </div>
          <hgroup className="antialiased font-sans">
            <h6 className="flex items-center gap-2 mb-2 text-base font-medium leading-relaxed tracking-normal text-blue-gray-900">
              <span>{username}</span>
            </h6>
            {!!bio && (
              <TruncateCardText
                text={bio}
                className="block text-sm font-normal leading-normal text-gray-700"
              />
            )}
          </hgroup>
        </article>
      </PopoverContent>
    </Popover>
  );
}

export default memo(ProfilePicture);
