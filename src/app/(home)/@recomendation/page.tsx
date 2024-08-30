import { getServerSideSession } from "@/helpers/global";
import { getFollowRecomendation } from "@/modules/user/action";
import RecomendationSection from "@/modules/user/components/RecomendationSection";

export default async function Page() {
  const [{ data = [] }, session] = await Promise.all([
    getFollowRecomendation(),
    getServerSideSession(),
  ]);

  return <RecomendationSection data={data} session={session} />;
}
