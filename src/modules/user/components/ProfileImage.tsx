"use client";

import useProfile from "@/modules/user/hooks/useProfile";
import PriorityImage from "@/components/common/PriorityImage";
import { GUEST } from "@/components/images";
import Link from "next/link";
import { memo } from "react";

export interface ProfileImageProps {
  wrapperClass?: string;
  imageClass?: string;
  h?: number;
  w?: number;
}

function ProfileImage({
  wrapperClass,
  imageClass,
  h = 80,
  w = 80,
}: ProfileImageProps) {
  const { me } = useProfile();

  return (
    <Link prefetch href="/profile" passHref>
      <figure className={wrapperClass}>
        <PriorityImage
          height={h}
          width={w}
          className={imageClass}
          alt="profile"
          src={me?.imageUrl || GUEST}
        />
      </figure>
    </Link>
  );
}

export default memo(ProfileImage);
