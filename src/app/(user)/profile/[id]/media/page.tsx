import { getServerSideSession, isValidUUID } from "@/helpers/global";
import type { PageProps } from "@/interfaces";
import { getPostByUserId } from "@/modules/home/action";
import User from "@/modules/user";
import { getUserById } from "@/modules/user/action";
import { notFound, redirect } from "next/navigation";
import { USER_TAB } from "../../constant";
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
    getPostByUserId(id, {}, "t"),
  ]);

  if (error) redirect("/");

  if (!data) notFound();

  return (
    <User
      session={session}
      user={data}
      tabs={USER_TAB.map((el) => ({
        ...el,
        href: el.href.replace("[USER_ID]", data.id),
      }))}
      activeTab="media"
      isFollower={data.isFollower}
    >
      <UserPostList
        user={null}
        session={session}
        posts={posts}
        fetcher={async (payload) => {
          "use server";
          return getPostByUserId(id, payload, "t");
        }}
      />
    </User>
  );
}
