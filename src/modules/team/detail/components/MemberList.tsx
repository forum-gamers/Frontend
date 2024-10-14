"use client";

import useScroll, { type Fetcher } from "@/hooks/useScroll";
import useMember from "../hooks/useMember";
import type { GetTeamMemberAttributes } from "@/interfaces/model";
import MemberCard from "./MemberCard";
import type { CustomSession } from "@/interfaces";
import { memo } from "react";
import SkeletonCard from "@/components/common/SkeletonCard";

export interface MemberListProps {
  fetcher: Fetcher<GetTeamMemberAttributes>;
  session: CustomSession | null;
}

function MemberList({ fetcher, session }: MemberListProps) {
  const { datas, ref, pending } = useScroll<
    HTMLDivElement,
    GetTeamMemberAttributes
  >(useMember, fetcher);

  return (
    <section
      id="member-list"
      className="overflow-y-scroll space-y-6 no-scrollbar w-full"
    >
      {!!datas.length &&
        datas.map((el) => (
          <MemberCard session={session} key={el.userId} data={el} />
        ))}
      <div ref={ref}></div>
      {pending && <SkeletonCard />}
    </section>
  );
}

export default memo(MemberList);
