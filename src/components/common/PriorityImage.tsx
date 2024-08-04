import Image, { type ImageProps } from "next/image";

export interface PriorityImageProps extends ImageProps {
  width: number;
  height: number;
  alt: string;
}

export default function PriorityImage({
  width,
  height,
  alt = "",
  ...rest
}: PriorityImageProps) {
  return <Image {...rest} alt={alt} width={width} height={height} priority />;
}
