import { getMyPost } from "@/modules/feed/action";
import User from "@/modules/user";
import { getMe } from "@/modules/user/action";
import { redirect } from "next/navigation";
import { ME_TAB } from "../../constant";
import { getServerSideSession } from "@/helpers/global";
import UserPostList from "@/modules/user/components/UserPostList";

export default async function Page() {
  const [{ error, data }, { data: posts = [] }, session] = await Promise.all([
    getMe(),
    getMyPost({}, "t"),
    getServerSideSession(),
  ]);
  if (error || !data) redirect("/");

  if (!session) redirect("/login");

  return (
    <User
      session={session}
      tabs={ME_TAB}
      activeTab="media"
      user={data}
      isFollower={false}
    >
      <UserPostList
        session={session}
        posts={posts}
        fetcher={async (payload) => {
          "use server";
          return getMyPost(payload, "t");
        }}
        user={data}
      />
    </User>
  );
}
