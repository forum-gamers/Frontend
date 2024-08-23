import { ScrollArea } from "@/components/ui/scroll-area";
import { getFollowRecomendation } from "@/modules/user/action";
import UserRecomendationCard from "@/modules/user/components/UserRecomendationCard";

export default async function Page() {
  const { data } = await getFollowRecomendation();

  return (
    <section className="w-full" id="recomendation">
      <h4 className="mb-4 text-sm font-medium leading-none">You may know</h4>
      <ScrollArea className="h-72 w-full rounded-md border flex items-center no-scrollbar scroll-smooth">
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
