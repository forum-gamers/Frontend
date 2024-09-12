"use client";

import useProfile from "@/modules/user/hooks/useProfile";
import PriorityImage from "@/components/common/PriorityImage";
import { GUEST } from "@/components/images";
import Link from "next/link";
import { memo } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
  const { prefetch } = useRouter();
  const { me } = useProfile();

  return (
    <figure
      className={wrapperClass}
      style={{ height: h, width: w, overflow: "hidden" }}
    >
      <PriorityImage
        height={h}
        width={w}
        className={cn(imageClass, "object-cover")}
        alt="profile"
        src={me?.imageUrl || GUEST}
        onClick={() => prefetch("/profile")}
      />
    </figure>
  );
}

export default memo(ProfileImage);
