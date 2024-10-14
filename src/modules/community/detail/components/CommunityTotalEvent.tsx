"use client";

import { memo, type HtmlHTMLAttributes } from "react";
import useTargetCommunity from "../../hooks/useTargetCommunity";

function CommunityTotalEvent(props: HtmlHTMLAttributes<HTMLParagraphElement>) {
  const { data } = useTargetCommunity();

  return <p {...props}>{data?.totalEvent ?? 0}</p>;
}

export default memo(CommunityTotalEvent);
