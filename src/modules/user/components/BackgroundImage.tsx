"use client";

import PriorityImage from "@/components/common/PriorityImage";
import useProfile from "../hooks/useProfile";
import { BACKDROP } from "@/components/images";

export interface BackgroundImageProps {
  wrapperClass?: string;
  imageClass?: string;
  h?: number;
  w?: number;
}

export default function BackgroundImage({
  wrapperClass,
  imageClass,
  h = 100,
  w = 100,
}: BackgroundImageProps) {
  const { me } = useProfile();

  return (
    <figure className={wrapperClass}>
      <PriorityImage
        width={w}
        height={h}
        className={imageClass}
        alt="backdrop"
        src={me?.backgroundImageUrl || BACKDROP}
      />
    </figure>
  );
}
