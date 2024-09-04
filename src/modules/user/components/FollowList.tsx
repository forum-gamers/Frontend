"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { FollowAttributes } from "@/interfaces/model";
import UserRecomendationCard from "./UserRecomendationCard";
import type { BasePagination, CustomSession } from "@/interfaces";
import useScroll from "@/hooks/useScroll";
import useFollow from "../hooks/useFollow";
import SkeletonCard from "@/components/common/SkeletonCard";
import { useEffect } from "react";
import { GUEST } from "@/components/images";

export interface FollowListProps {
  session: CustomSession | null;
  handler: (
    query: BasePagination
  ) => Promise<{ error?: string | null; data: FollowAttributes[] }>;
  type: "following" | "follower";
  initialDatas: FollowAttributes[];
}

export default function FollowList({
  session,
  handler,
  type,
  initialDatas,
}: FollowListProps) {
  const { resetData, setDatas } = useFollow();
  useEffect(() => {
    resetData();
    setDatas(initialDatas);
  }, []);

  const { ref, pending, datas } = useScroll<HTMLDivElement, FollowAttributes>(
    useFollow,
    handler
  );

  return (
    <ScrollArea className="w-full h-72 rounded-md flex items-center no-scrollbar scroll-smooth">
      {!!datas?.length &&
        datas.map((el) => (
          <>
            <div className="space-y-4 my-4">
              <UserRecomendationCard
                username={
                  el?.[type === "following" ? "followed" : "follower"]
                    ?.username ?? ""
                }
                key={el?.id}
                id={
                  el?.[type === "following" ? "followed" : "follower"]?.id ?? ""
                }
                bio={
                  el?.[type === "following" ? "followed" : "follower"]?.bio ??
                  ""
                }
                imageUrl={
                  el?.[type === "following" ? "followed" : "follower"]
                    ?.imageUrl ?? GUEST
                }
                session={session}
                isFollower
              />
            </div>
            <div ref={ref}></div>
          </>
        ))}
      {pending && <SkeletonCard />}
    </ScrollArea>
  );
}
