import { getServerSideSession } from "@/helpers/global";
import type { PageProps } from "@/interfaces";
import { getCommunityPost } from "@/modules/community/action";
import CommunityPostList from "@/modules/community/detail/components/CommunityPostList";
import { redirect } from "next/navigation";
import CreatePostCommunityForm from "@/modules/community/detail/components/CreatePostCommunityForm";

export default async function Page({
  params: { id },
}: PageProps<{ id: string }>) {
  const communityId = parseInt(id);
  if (isNaN(communityId)) redirect("/community");

  const [{ data = [] }, session] = await Promise.all([
    getCommunityPost(communityId, { page: 1, limit: 15 }),
    getServerSideSession(),
  ]);

  return (
    <>
      <CreatePostCommunityForm communityId={communityId} />
      <CommunityPostList
        initialDatas={data}
        session={session}
        fetcher={async (props) => {
          "use server";
          return getCommunityPost(communityId, props);
        }}
      />
    </>
  );
}
