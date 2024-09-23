"use client";

import { CardTitle } from "@/components/ui/card";
import { memo } from "react";
import useTargetCommunity from "../../hooks/useTargetCommunity";

function CommunityName() {
  const { data } = useTargetCommunity();
  return (
    <CardTitle className="text-2xl font-bold text-white mb-2">
      {data?.name && data?.name.length > 50
        ? data?.name.slice(0, 50) + "..."
        : data?.name}
    </CardTitle>
  );
}

export default memo(CommunityName);
