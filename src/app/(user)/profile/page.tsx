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
      id={data.id}
      session={session}
      followersCount={data.followersCount}
      followingCount={data.followingCount}
      username={data.username}
      imageUrl={data.imageUrl}
      backgroundUrl={data.backgroundImageUrl}
      bio={data.bio}
      tabs={ME_TAB}
      activeTab="post"
      isFollower={false}
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
