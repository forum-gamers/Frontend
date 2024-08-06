import { getMyLikedPost } from "@/modules/home/action";
import User from "@/modules/user";
import { getMe } from "@/modules/user/action";
import { redirect } from "next/navigation";
import { ME_TAB } from "../../constant";
import { getServerSideSession } from "@/helpers/global";
import UserPostList from "@/modules/user/components/UserPostList";

export default async function Page() {
  const [{ error, data }, { data: posts = [] }, session] = await Promise.all([
    getMe(),
    getMyLikedPost({}),
    getServerSideSession(),
  ]);
  if (error || !data) redirect("/");

  if (!session) redirect("/login");

  return (
    <User
      username={data.username}
      id={data.id}
      imageUrl={data.imageUrl}
      backgroundUrl={data.backgroundImageUrl}
      bio={data.bio}
      tabs={ME_TAB}
      activeTab="post"
    >
      <UserPostList session={session} posts={posts} fetcher={getMyLikedPost} />
    </User>
  );
}
