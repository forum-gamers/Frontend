import { getServerSideSession, isValidUUID } from "@/helpers/global";
import type { PageProps } from "@/interfaces";
import { getPostByUserId } from "@/modules/home/action";
import User from "@/modules/user";
import { getUserById } from "@/modules/user/action";
import { notFound, redirect } from "next/navigation";
import { USER_TAB } from "../constant";
import UserPostList from "@/modules/user/components/UserPostList";

export default async function Page({
  params: { id },
}: PageProps<{ id: string }>) {
  const session = await getServerSideSession();
  if (!session) redirect("/login");

  if (session?.user?.id === id) redirect("/profile");

  if (!isValidUUID(id)) redirect("/");

  const [{ data, error }, { data: posts = [] }] = await Promise.all([
    getUserById(id),
    getPostByUserId(id, {}),
  ]);

  if (error) redirect("/");

  if (!data) notFound();

  return (
    <User
      isFollower={data.isFollower}
      id={data.id}
      session={session}
      username={data.username}
      imageUrl={data.imageUrl}
      backgroundUrl={data.backgroundImageUrl}
      bio={data.bio}
      tabs={USER_TAB.map((el) => ({
        ...el,
        href: el.href.replace("[USER_ID]", data.id),
      }))}
      activeTab="post"
      followersCount={data.followersCount}
      followingCount={data.followingCount}
    >
      <UserPostList
        user={null}
        session={session}
        posts={posts}
        fetcher={async (payload) => {
          "use server";
          return getPostByUserId(id, payload);
        }}
      />
    </User>
  );
}

//TODO generateStaticParams
