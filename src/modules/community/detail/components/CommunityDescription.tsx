"use client";

import TruncateCardText from "@/components/common/TruncateCardText";
import useTargetCommunity from "../../hooks/useTargetCommunity";
import { memo } from "react";

function CommunityDescription() {
  const { data } = useTargetCommunity();

  return (
    <TruncateCardText
      className="text-neutral-900 dark:text-neutral-300 text-3xl"
      text={data?.description ?? "No description"}
      max={45}
    />
  );
}

export default memo(CommunityDescription);
