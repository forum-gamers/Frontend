"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { GetTeamMemberAttributes } from "@/interfaces/model";
import { cn } from "@/lib/utils";
import { memo, useCallback, useEffect, useState, useTransition } from "react";
import { getTeamMember } from "../../action";
import MemberCard from "./MemberCard";
import NoDataState from "@/components/common/NoDataState";
import SkeletonCard from "@/components/common/SkeletonCard";
import type { CustomSession } from "@/interfaces";
import ApproveBtn from "./ApproveBtn";
import RejectBtn from "./RejectBtn";
import useMember from "../hooks/useMember";
import useTargetTeam from "../hooks/useTargetTeam";

export interface SeeJoinListBtnProps {
  session: CustomSession | null;
}

function SeeJoinListBtn({ session }: SeeJoinListBtnProps) {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false);
  const [members, setMembers] = useState<GetTeamMemberAttributes[]>([]);
  const { setDatas, resetDatas, datas } = useMember();
  const { setData, data: team } = useTargetTeam();

  const onSuccess = useCallback(
    (type: "approve" | "reject", memberId: string) => {
      setMembers((members) =>
        members.filter((member) => member.userId !== memberId)
      );

      let temp = datas;
      resetDatas();
      let newData = members?.find((member) => member.userId === memberId);
      if (newData) setDatas([newData]);
      setDatas(temp);

      if (team)
        setData({
          ...team,
          totalMember: team?.totalMember + (type === "approve" ? 1 : -1),
        });
    },
    [members, team, datas, resetDatas, setDatas, setData]
  );

  useEffect(() => {
    startTransition(async () => {
      if (!team) return;
      if (!members.length) {
        const { data = [] } = await getTeamMember(team?.id, {
          page: 1,
          limit: 20,
          status: false,
        });

        setMembers(data);
      }
    });
  }, [team]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative inline-block">
          <Button
            className={cn(
              "border-none text-neutral-900 dark:text-neutral-300",
              "bg-blue-500 hover:bg-blue-600"
            )}
          >
            See Member Join List
          </Button>
          {!!members.length && (
            <span className="absolute left-full ml-1 text-red-500 text-xs">
              {members.length}
            </span>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#202225] min-h-[25%] max-h-[50%]">
        <DialogHeader>
          <DialogTitle>Member Join List</DialogTitle>
        </DialogHeader>
        <section
          className="overflow-y-scroll space-y-6 no-scrollbar w-full max-h-full"
          id="join-list"
        >
          {!!members.length ? (
            members.map((member) => (
              <div className="grid grid-cols-8 gap-1" key={member.userId}>
                <MemberCard
                  session={session}
                  data={member}
                  wrapperClassName="col-span-5"
                />
                <div className="col-span-3 space-y-2 flex flex-col h-full justify-between">
                  <ApproveBtn
                    teamId={team?.id ?? ""}
                    memberId={member.userId}
                    className="w-full h-1/2"
                    onSuccess={() => onSuccess("approve", member.userId)}
                  />
                  <RejectBtn
                    teamId={team?.id ?? ""}
                    memberId={member.userId}
                    className="w-full h-1/2"
                    onSuccess={() => onSuccess("reject", member.userId)}
                  />
                </div>
              </div>
            ))
          ) : (
            <NoDataState />
          )}
          {pending && <SkeletonCard />}
        </section>
      </DialogContent>
    </Dialog>
  );
}

export default memo(SeeJoinListBtn);
