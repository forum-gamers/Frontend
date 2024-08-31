"use client";

import type { UserRecomendationAttributes } from "@/interfaces/model";
import { useEffect } from "react";
import useRecomendation from "../hooks/useRecomendation";
import UserRecomendationCard from "./UserRecomendationCard";
import type { CustomSession } from "@/interfaces";

export interface ListRecomendationProps {
  initialData: UserRecomendationAttributes[];
  session: CustomSession | null;
}

export default function ListRecomendation({
  initialData,
  session,
}: ListRecomendationProps) {
  const { setDatas, datas } = useRecomendation();
  useEffect(() => {
    setDatas(initialData);
  }, []);

  return (
    <div className="space-y-4 my-4">
      {!!datas?.length &&
        datas.map((el) => (
          <UserRecomendationCard
            id={el.userId}
            username={el.username}
            bio={el.userBio}
            imageUrl={el.userImageUrl}
            source={el.source}
            key={el.userId}
            isFollower={el.followerStatus === "follower"}
            session={session}
          />
        ))}
    </div>
  );
}
