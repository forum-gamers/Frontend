import { getServerSideSession } from "@/helpers/global";
import type { PageProps } from "@/interfaces";
import { getCommunityEvent } from "@/modules/community/action";
import CreateEventForm from "@/modules/community/detail/components/CreateEventForm";
import EventList from "@/modules/community/detail/components/EventList";
import InitEvent from "@/modules/community/detail/components/InitEvent";
import { redirect } from "next/navigation";

export default async function Page({
  params: { id },
}: PageProps<{ id: string }>) {
  const communityId = parseInt(id);
  if (isNaN(communityId)) redirect("/community");

  const [session, { data = [] }] = await Promise.all([
    getServerSideSession(),
    getCommunityEvent(communityId, { page: 1, limit: 15 }),
  ]);

  return (
    <>
      <InitEvent datas={data} />
      <CreateEventForm communityId={communityId} />
      <EventList
        session={session}
        fetcher={async (props) => {
          "use server";
          return getCommunityEvent(communityId, props);
        }}
      />
    </>
  );
}
