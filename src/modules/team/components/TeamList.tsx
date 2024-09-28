"use client";

import usePagination from "@/hooks/usePagination";
import type { GetTeamDto } from "@/interfaces/model";
import type { BaseQuery } from "@/interfaces/request";
import { memo } from "react";
import useTeam from "../hooks/useTeam";
import { getTeam } from "../action";
import NoDataState from "@/components/common/NoDataState";
import Pagination from "@/components/common/Pagination";
import { cn } from "@/lib/utils";
import SkeletonCard from "@/components/common/SkeletonCard";
import TeamCard from "./TeamCard";

function TeamList() {
  const { datas, setPage, pending, hasMore, page, totalPage } = usePagination<
    GetTeamDto,
    BaseQuery & { q?: string }
  >(useTeam, getTeam, { page: 1, limit: 10, q: "" });

  return (
    <section id="team-list" className="overflow-y-hidden h-[calc(100vh-200px)]">
      {!!datas?.length ? (
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 overflow-y-scroll h-[80%]",
            pending && "space-y-4 my-4"
          )}
        >
          {pending
            ? Array.from({ length: 4 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))
            : datas.map((data) => <TeamCard key={data.id} team={data} />)}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <NoDataState />
        </div>
      )}
      <br />
      <Pagination
        hasMore={hasMore}
        totalPage={totalPage}
        setPage={setPage}
        page={page}
      />
    </section>
  );
}

export default memo(TeamList);
