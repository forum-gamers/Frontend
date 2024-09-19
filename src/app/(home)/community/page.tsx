import { getServerSideSession } from "@/helpers/global";
import CommunityPage from "@/modules/community";

export default async function Page() {
  const [session] = await Promise.all([getServerSideSession()]);

  return <CommunityPage session={session} initialDatas={[]} />;
}
