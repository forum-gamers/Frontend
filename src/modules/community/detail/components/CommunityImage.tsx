"use client";

import PriorityImage from "@/components/common/PriorityImage";
import { GUEST } from "@/components/images";
import useTargetCommunity from "../../hooks/useTargetCommunity";
import { memo } from "react";

function CommunityImage() {
  const { data } = useTargetCommunity();
  return (
    <PriorityImage
      src={data?.imageUrl || GUEST}
      alt={"community.name"}
      width={400}
      height={200}
      className="w-full h-48 object-cover rounded-t-lg"
    />
  );
}

export default memo(CommunityImage);
