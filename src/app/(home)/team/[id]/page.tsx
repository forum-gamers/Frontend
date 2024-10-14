import { getServerSideSession, isValidUUID } from "@/helpers/global";
import type { PageProps } from "@/interfaces";
import { getTeamById, getTeamMember } from "@/modules/team/action";
import TeamDetail from "@/modules/team/detail";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: PageProps<{ id: string }>) {
  const { id } = await params;
  if (!isValidUUID(id)) redirect("/team");

  const [session, { data: members = [] }, { data }] = await Promise.all([
    getServerSideSession(),
    getTeamMember(id, { page: 1, limit: 10, status: true }),
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
        return getTeamMember(id, { ...props, status: true });
      }}
    />
  );
}

export const dynamicParams = true;

export const experimental_ppr = true;

export async function generateStaticParams() {
  return [];
}
