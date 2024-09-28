import { getServerSideSession, isValidUUID } from "@/helpers/global";
import type { PageProps } from "@/interfaces";
import { getTeamById, getTeamMember } from "@/modules/team/action";
import TeamDetail from "@/modules/team/detail";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params: { id },
}: PageProps<{ id: string }>) {
  if (!isValidUUID(id)) redirect("/team");

  const [session, { data: members = [] }, { data }] = await Promise.all([
    getServerSideSession(),
    getTeamMember(id, { page: 1, limit: 10 }),
    getTeamById(id),
  ]);

  if (!data) notFound();

  return (
    <TeamDetail
      data={data}
      session={session}
      members={members}
      fetcher={async (props) => {
        "use server";
        return getTeamMember(id, props);
      }}
    />
  );
}
