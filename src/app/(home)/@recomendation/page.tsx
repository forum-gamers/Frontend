import { ScrollArea } from "@/components/ui/scroll-area";
import { getFollowRecomendation } from "@/modules/user/action";
import UserRecomendationCard from "@/modules/user/components/UserRecomendationCard";

export default async function Page() {
  const { data } = await getFollowRecomendation();

  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="space-y-4">
        <h4 className="mb-4 text-sm font-medium leading-none">May you know</h4>
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
  );
}
