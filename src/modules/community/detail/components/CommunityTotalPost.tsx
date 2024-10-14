"use client";

import { memo, type HtmlHTMLAttributes } from "react";
import useTargetCommunity from "../../hooks/useTargetCommunity";

function CommunityTotalPost(props: HtmlHTMLAttributes<HTMLParagraphElement>) {
  const { data } = useTargetCommunity();

  return <p {...props}>{data?.totalPost ?? 0}</p>;
}

export default memo(CommunityTotalPost);
