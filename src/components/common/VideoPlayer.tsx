"use client";

import { useState } from "react";
import ReactPlayer, { type ReactPlayerProps } from "react-player/lazy";
import { Skeleton } from "../ui/skeleton";

export interface VideoPlayerProps extends ReactPlayerProps {
  src: string;
  className?: string;
  height: number;
  width: number;
}

export default function VideoPlayer({
  src,
  className,
  height,
  width,
  ...rest
}: VideoPlayerProps) {
  const [play, setPlay] = useState<boolean>(false);

  const togglePlay = () => setPlay(!play);

  return (
    <figure className="relative" onClick={togglePlay}>
      <ReactPlayer
        {...rest}
        fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}
        width={width}
        height={height}
        url={src}
        className={className}
        playing={play}
        controls
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />
    </figure>
  );
}
