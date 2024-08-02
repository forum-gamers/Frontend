"use client";

import Image, { type StaticImageData, type ImageProps } from "next/image";
import { useState } from "react";

export interface LazyLoadImgProps extends ImageProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  rounded?: string;
}

export default function LazyLoadImg({
  src,
  alt,
  rounded,
  className = "",
  ...rest
}: LazyLoadImgProps) {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <figure
      className={`overflow-hidden ${!!rounded ? rounded : ""} ${
        loading ? "animate-pulse" : ""
      }`}
    >
      <Image
        alt={alt}
        src={src}
        loading="lazy"
        onLoad={() => setLoading(false)}
        quality={100}
        className={`duration-700 ease-in-out ${
          loading
            ? "scale-[1.02] blur-xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        } ${!!rounded ? rounded : ""} ${className}`}
        {...rest}
      />
    </figure>
  );
}
