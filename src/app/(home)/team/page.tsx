import { getServerSideSession } from "@/helpers/global";
import TeamPage from "@/modules/team";
import { getTeam } from "@/modules/team/action";

export default async function Page() {
  const [session, { data = [] }] = await Promise.all([
    getServerSideSession(),
    getTeam({ page: 1, limit: 10 }),
  ]);
  return <TeamPage session={session} datas={data || []} />;
}
