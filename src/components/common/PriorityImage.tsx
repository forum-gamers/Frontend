import Image, { type ImageProps } from "next/image";

export interface PriorityImageProps extends ImageProps {
  width?: number;
  height?: number;
  alt: string;
  priority?: boolean;
}

export default function PriorityImage({
  width,
  height,
  alt = "",
  fill = false,
  ...rest
}: PriorityImageProps) {
  return (
    <Image
      {...rest}
      fill={fill}
      alt={alt}
      width={width}
      height={height}
      priority
    />
  );
}
