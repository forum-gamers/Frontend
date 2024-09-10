"use client";

import type { UserRecomendationAttributes } from "@/interfaces/model";
import { useEffect } from "react";
import useRecomendation from "../hooks/useRecomendation";
import UserRecomendationCard from "./UserRecomendationCard";
import type { CustomSession } from "@/interfaces";
import useMount from "@/hooks/useMounted";

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

  const mount = useMount();
  if (!mount) return null;

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
            isFollower={false}
            session={session}
            createdAt={el.userCreatedAt}
            backgroundUrl={el.userBackgroundImageUrl}
          />
        ))}
    </div>
  );
}
