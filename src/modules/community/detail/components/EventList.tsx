"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useScroll, { type Fetcher } from "@/hooks/useScroll";
import type { CommunityEventWithCreator } from "@/interfaces/model";
import { memo } from "react";
import useCommunityEvent from "../../hooks/useCommunityEvent";
import type { CustomSession } from "@/interfaces";
import EventCard from "./EventCard";
import NoDataState from "@/components/common/NoDataState";
import SkeletonCard from "@/components/common/SkeletonCard";

export interface EventListProps {
  fetcher: Fetcher<CommunityEventWithCreator>;
  session: CustomSession | null;
}

function EventList({ fetcher, session }: EventListProps) {
  const { datas, ref, pending } = useScroll<
    HTMLDivElement,
    CommunityEventWithCreator
  >(useCommunityEvent, fetcher);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-scroll space-y-6 no-scrollbar mx-auto max-w-lg">
        {!!datas?.length ? (
          datas?.map((data) => (
            <EventCard
              eventDate={data.startTime}
              title={data.title}
              session={session}
              key={data.id}
              createdAt={data.creator.createdAt}
              backgroundUrl={data.creator.backgroundUrl}
              isFollowed={data.creator.isFollowed}
              bio={data.creator.bio}
              src={data.creator.imageUrl}
              alt={`${data.creator.username} profile picture`}
              username={data.creator.username}
              id={data.creator.id}
            />
          ))
        ) : (
          <NoDataState />
        )}
        <div ref={ref}></div>
        {pending && <SkeletonCard />}
      </CardContent>
    </Card>
  );
}

export default memo(EventList);
