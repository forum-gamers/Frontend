import { ScrollArea } from "@/components/ui/scroll-area";
import UserRecomendationCard from "./UserRecomendationCard";
import type { UserRecomendationAttributes } from "@/interfaces/model";
import { memo } from "react";

export interface RecomendationSectionProps {
  data: UserRecomendationAttributes[];
}

function RecomendationSection({ data = [] }: RecomendationSectionProps) {
  return (
    <section className="w-full" id="recomendation">
      <h4 className="mb-4 text-sm font-medium leading-none">You may know</h4>
      <ScrollArea className="h-72 w-full rounded-md flex items-center no-scrollbar scroll-smooth">
        <div className="space-y-4 my-4">
          {!!data?.length &&
            data.map((el) => (
              <UserRecomendationCard
                id={el.userId}
                username={el.username}
                bio={el.userBio}
                imageUrl={el.userImageUrl}
                source={el.source}
                key={el.userId}
                isFollower={el.followerStatus === "follower"}
              />
            ))}
        </div>
      </ScrollArea>
    </section>
  );
}

export default memo(RecomendationSection);
