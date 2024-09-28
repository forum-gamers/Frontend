"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  memo,
  useCallback,
  useMemo,
  useOptimistic,
  useTransition,
  type MouseEventHandler,
} from "react";
import useTargetTeam from "../hooks/useTargetTeam";
import useMount from "@/hooks/useMounted";
import { joinTeam, leaveTeam } from "../../action";
import useProfile from "@/modules/user/hooks/useProfile";

function JoinBtn() {
  const mount = useMount();
  const { me } = useProfile();
  const { data, setData } = useTargetTeam();
  const [pending, startTransition] = useTransition();
  const [optimisticIsJoined, optimisticHandler] = useOptimistic(
    data?.isJoined ?? false,
    (prev: boolean) => !prev
  );

  const onClickHandler: MouseEventHandler = useCallback(
    (e) => {
      startTransition(async () => {
        if (!data || mount || !me || me.id === data.owner) return;
        optimisticHandler(optimisticIsJoined);

        data?.isJoined ? await leaveTeam(data.id) : await joinTeam(data.id);

        setData({
          ...data,
          isJoined: !optimisticIsJoined,
          totalMember: data?.status
            ? data?.totalMember ?? 0 + (optimisticIsJoined ? -1 : 1)
            : data?.totalMember ?? 0,
        });
      });
    },
    [optimisticIsJoined, data, mount]
  );

  const text = useMemo(() => {
    switch (true) {
      case optimisticIsJoined && data?.status:
        return "Leave Team";
      case optimisticIsJoined && !data?.status:
        return "Waiting for approval";
      default:
        return "Join Team";
    }
  }, [optimisticIsJoined, data?.status]);

  return mount && me?.id !== data?.owner ? (
    <Button
      disabled={
        pending ||
        (optimisticIsJoined && !data?.status) ||
        me?.id === data?.owner
      }
      className={cn(
        optimisticIsJoined
          ? "border-2 border-blue-500 hover:border-blue-600 bg-white hover:bg-gray-50 dark:bg-[#202225] dark:hover:bg-slate-900"
          : "bg-blue-500 hover:bg-blue-600",
        "text-neutral-900 dark:text-neutral-300",
        "transition-all duration-300 hover:opacity-75 hover:scale-[98.5%]",
        me?.id === data?.owner && "cursor-not-allowed"
      )}
      onClick={onClickHandler}
    >
      {text}
    </Button>
  ) : null;
}

export default memo(JoinBtn);
