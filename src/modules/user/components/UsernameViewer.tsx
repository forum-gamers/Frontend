"use client";

import useProfile from "../hooks/useProfile";

export interface UsernameViewerProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export default function UsernameViewer({
  as: Tag = "h2",
  className,
}: UsernameViewerProps) {
  const { me } = useProfile();

  return <Tag className={className}>{me?.username}</Tag>;
}
