import Image, { type ImageProps } from "next/image";

export interface PriorityImageProps extends ImageProps {
  width: number;
  height: number;
}

export default function PriorityImage({
  width,
  height,
  ...rest
}: PriorityImageProps) {
  return <Image {...rest} width={width} height={height} priority />;
}
