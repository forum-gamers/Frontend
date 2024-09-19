"use client";

import { memo } from "react";
import useCommunity from "../hooks/useCommunity";
import type { CommunityListAttributes } from "@/interfaces/model";
import usePagination from "@/hooks/usePagination";
import { getCommunities } from "../action";
import type { BaseQuery } from "@/interfaces/request";
import CommunityCard from "./CommunityCard";
import NoDataState from "@/components/common/NoDataState";
import Pagination from "./Pagination";
import SkeletonCard from "@/components/common/SkeletonCard";
import { cn } from "@/lib/utils";

function CommunityList() {
  const { datas, setPage, pending, hasMore, page, totalPage } = usePagination<
    CommunityListAttributes,
    BaseQuery & { q?: string }
  >(useCommunity, getCommunities, { page: 1, limit: 10, q: "" });

  return (
    <section
      id="community-list"
      className="overflow-y-hidden h-[calc(100vh-300px)]"
    >
      {!!datas?.length ? (
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 gap-6 h-[80%] overflow-y-scroll",
            pending && "space-y-4 my-4"
          )}
        >
          {pending
            ? Array.from({ length: 4 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))
            : datas.map((data) => (
                <CommunityCard key={data.id} community={data} />
              ))}
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

export default memo(CommunityList);
