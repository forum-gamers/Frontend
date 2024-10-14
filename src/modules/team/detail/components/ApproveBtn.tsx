"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { memo, useCallback, type MouseEventHandler } from "react";
import { approveTeamMember } from "../../action";
import { swalError } from "@/lib/swal";

export interface ApproveBtnProps {
  teamId: string;
  memberId: string;
  className?: string;
  onSuccess: () => void;
}

function ApproveBtn({
  teamId,
  memberId,
  className,
  onSuccess,
}: ApproveBtnProps) {
  const onClickHandler: MouseEventHandler = useCallback(async () => {
    const { error } = await approveTeamMember(teamId, memberId);
    if (error) {
      swalError(error || "Something went wrong");
      return;
    }

    if (typeof onSuccess === "function") onSuccess();
  }, [teamId, memberId]);

  return (
    <Button
      className={cn(
        "border-none text-neutral-900 dark:text-neutral-300",
        "bg-blue-500 hover:bg-blue-600",
        className
      )}
      onClick={onClickHandler}
    >
      Approve
    </Button>
  );
}

export default memo(ApproveBtn);
