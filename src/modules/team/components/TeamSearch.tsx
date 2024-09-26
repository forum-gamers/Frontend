"use client";

import { memo } from "react";
import AnimateInput from "@/components/common/AnimateInput";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

function TeamSearch() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <AnimateInput
        type="text"
        placeholder="Search communities..."
        className="pl-10 pr-4 py-2"
        value={"value"}
        onChange={() => {}}
      />
      {true && (
        <X
          className={cn(
            "absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400",
            "transition-all duration-300"
          )}
        />
      )}
    </div>
  );
}

export default memo(TeamSearch);
