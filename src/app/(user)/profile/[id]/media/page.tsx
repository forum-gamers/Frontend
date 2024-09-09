import { getServerSideSession, isValidUUID } from "@/helpers/global";
import type { PageProps } from "@/interfaces";
import { getPostByUserId } from "@/modules/home/action";
import User from "@/modules/user";
import { getUserById } from "@/modules/user/action";
import { notFound, redirect } from "next/navigation";
import { USER_TAB } from "../../constant";
import UserPostList from "@/modules/user/components/UserPostList";
import type { Metadata } from "next";

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

export async function generateMetadata({
  params: { id },
}: PageProps<{ id: string }>): Promise<Metadata> {
  if (!isValidUUID(id)) return {};

  const { error, data } = await getUserById(id);
  if (error || !data) return {};

  return {
    title: `Profile - ${data.username}`,
    description: `Bio - ${data.bio}`,
    robots: {
      index: true,
      follow: true,
    },
    keywords: [data.username, ...data.bio.split(" ")],
    creator: data.username,
    publisher: data.username,
  };
}

export const dynamicParams = true;
