import { getFollowRecomendation } from "@/modules/user/action";
import RecomendationSection from "@/modules/user/components/RecomendationSection";

export default async function Page() {
  const { data = [] } = await getFollowRecomendation();

  return <RecomendationSection data={data} />;
}
