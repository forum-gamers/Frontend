"use client";

import { memo, type HtmlHTMLAttributes } from "react";
import useTargetCommunity from "../../hooks/useTargetCommunity";

function CommunityTotalMember({
  asChild,
  ...props
}: HtmlHTMLAttributes<HTMLParagraphElement> & { asChild?: boolean }) {
  const { data } = useTargetCommunity();

  return asChild ? (
    `${data?.totalMember ?? 0}`
  ) : (
    <p {...props}>{data?.totalMember ?? 0}</p>
  );
}

export default memo(CommunityTotalMember);
