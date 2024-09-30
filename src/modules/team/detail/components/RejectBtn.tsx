"use client";

import { Button } from "@/components/ui/button";
import { swalError } from "@/lib/swal";
import { cn } from "@/lib/utils";
import { memo, useCallback, type MouseEventHandler } from "react";
import { rejectTeamMember } from "../../action";

export interface RejectBtnProps {
  teamId: string;
  memberId: string;
  className?: string;
  onSuccess: () => void;
}

function RejectBtn({ teamId, memberId, className, onSuccess }: RejectBtnProps) {
  const onClickHandler: MouseEventHandler = useCallback(async () => {
    const { error } = await rejectTeamMember(teamId, memberId);
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
        "bg-red-500 hover:bg-red-600",
        className
      )}
      onClick={onClickHandler}
    >
      Reject
    </Button>
  );
}

export default memo(RejectBtn);
