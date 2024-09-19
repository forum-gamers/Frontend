"use client";

import AnimateInput from "@/components/common/AnimateInput";
import { Search } from "lucide-react";
import { memo } from "react";

function CommunitySearch() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <AnimateInput
        type="text"
        placeholder="Search communities..."
        value={""}
        onChange={(e) => {}}
        className="pl-10 pr-4 py-2 w-64"
      />
    </div>
  );
}

export default memo(CommunitySearch);
