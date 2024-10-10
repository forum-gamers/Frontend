"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { CustomSession } from "@/interfaces";
import {
  memo,
  useCallback,
  useMemo,
  useState,
  useTransition,
  type MouseEventHandler,
} from "react";
import FollowList from "./FollowList";
import {
  getMyFollower,
  getMyFollowing,
  getUserFollower,
  getUserFollowing,
} from "../action";
import type { BaseQuery } from "@/interfaces/request";
import SkeletonCard from "@/components/common/SkeletonCard";
import type { FollowAttributes } from "@/interfaces/model";
import useProfile from "../hooks/useProfile";
import useTargetProfile from "../hooks/useTargetProfile";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export interface FollowSectionProps {
  id: string;
  className?: string;
}

function FollowSection({ id, className }: FollowSectionProps) {
  const { me } = useProfile();
  const { target } = useTargetProfile();
  const { data: session } = useSession();
  const data = useMemo(
    () => ({
      followersCount:
        me?.id === id ? me?.followersCount ?? 0 : target?.followersCount ?? 0,
      followingCount:
        me?.id === id ? me?.followingCount ?? 0 : target?.followingCount ?? 0,
    }),
    [id, me, session, target]
  );
  const [open, setOpen] = useState<boolean>(false);
  const [pending, startTransition] = useTransition();
  const [datas, setDatas] = useState<FollowAttributes[]>([]);
  const [type, setType] = useState<"follower" | "following">("follower");
  const handler = useMemo(
    () => ({
      follower:
        (session as CustomSession)?.user?.id !== id
          ? (query: BaseQuery) => getUserFollower(id, query)
          : getMyFollower,
      following:
        (session as CustomSession)?.user?.id !== id
          ? (query: BaseQuery) => getUserFollowing(id, query)
          : getMyFollowing,
    }),
    [type, (session as CustomSession)?.user?.id, id, me]
  );

  const handleSeeFollow = useCallback(
    (type: "follower" | "following"): MouseEventHandler =>
      (e) => {
        startTransition(async () => {
          setType(type);
          const { data: followData } = await handler[type]({
            page: 1,
            limit: 15,
          });
          setDatas(followData);
          setOpen(true);
        });
      },
    [data.followersCount, data.followingCount, type]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "flex sm:space-x-1 md:space-x-7 sm:text-xs text-sm items-start flex-nowrap",
            className
          )}
        >
          <Button
            className="cursor-pointer hover:text-opacity-85 hover:bg-opacity-0 pb-6"
            aria-disabled={pending || open}
            onClick={handleSeeFollow("follower")}
            disabled={pending || open}
            variant="link"
          >
            {data.followersCount} follower
            {`${data.followersCount > 1 ? "s" : ""}`}
          </Button>
          <Button
            variant="link"
            className="cursor-pointer hover:text-opacity-85 hover:bg-opacity-0 pb-6"
            aria-disabled={pending || open}
            onClick={handleSeeFollow("following")}
            disabled={pending || open}
          >
            {data.followingCount} following
            {`${data.followingCount > 1 ? "s" : ""}`}
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-[#202225] shadow-md shadow-gray-200 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100">
        {!pending ? (
          <>
            <DialogTitle className="capitalize">{type}</DialogTitle>
            <FollowList
              session={session as CustomSession}
              type={type}
              handler={handler[type]}
              initialDatas={datas}
            />
          </>
        ) : (
          <div className="w-full h-72 space-y-6 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default memo(FollowSection);
