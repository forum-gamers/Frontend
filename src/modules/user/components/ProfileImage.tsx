"use client";

import useProfile from "@/modules/user/hooks/useProfile";
import PriorityImage from "@/components/common/PriorityImage";
import { GUEST } from "@/components/images";

export interface ProfileImageProps {
  wrapperClass?: string;
  imageClass?: string;
  h?: number;
  w?: number;
}

export default function ProfileImage({
  wrapperClass,
  imageClass,
  h = 80,
  w = 80,
}: ProfileImageProps) {
  const { me } = useProfile();

  return (
    <figure className={wrapperClass}>
      <PriorityImage
        height={h}
        width={w}
        className={imageClass}
        alt="profile"
        src={me?.imageUrl || GUEST}
      />
    </figure>
  );
}
