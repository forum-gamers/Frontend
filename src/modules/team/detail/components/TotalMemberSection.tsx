"use client";

import { Progress } from "@/components/ui/progress";
import { Users } from "lucide-react";
import { memo } from "react";
import useTargetTeam from "../hooks/useTargetTeam";
import useMount from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

function TotalMemberSection() {
  const { data } = useTargetTeam();
  const mount = useMount();

  return (
    <>
      <div className="flex items-center justify-center sm:justify-start mb-4">
        <Users className="w-4 h-4 mr-2" />
        <span
          className={cn(
            "text-sm",
            !mount && "animate-pulse opacity-75 text-gray-100"
          )}
        >
          {data?.totalMember ?? 0} / {data?.maxMember ?? 0} members
        </span>
      </div>
      <Progress
        value={((data?.totalMember ?? 0) / (data?.maxMember ?? 0)) * 100}
        className={cn(
          "mb-4",
          !mount && "animate-pulse opacity-75 text-gray-100"
        )}
      />
    </>
  );
}

export default memo(TotalMemberSection);
