import { getMyPost } from "@/modules/home/action";
import User from "@/modules/user";
import { getMe } from "@/modules/user/action";
import { redirect } from "next/navigation";
import { ME_TAB } from "./constant";
import { getServerSideSession } from "@/helpers/global";
import UserPostList from "@/modules/user/components/UserPostList";

export default async function Page() {
  const [{ error, data }, { data: posts = [] }, session] = await Promise.all([
    getMe(),
    getMyPost({}),
    getServerSideSession(),
  ]);
  if (error || !data) redirect("/");

  if (!session) redirect("/login");

  return (
    <User
      session={session}
      tabs={ME_TAB}
      activeTab="post"
      isFollower={false}
      user={data}
    >
      <UserPostList
        session={session}
        posts={posts}
        user={data}
        fetcher={getMyPost}
      />
    </User>
  );
}
