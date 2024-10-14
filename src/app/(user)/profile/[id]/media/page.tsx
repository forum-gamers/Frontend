import { isValidUUID } from "@/helpers/global";
import type { PageProps } from "@/interfaces";
import { getPostByUserId } from "@/modules/home/action";
import User from "@/modules/user/targetIndex";
import { getUserById } from "@/modules/user/action";
import { notFound, redirect } from "next/navigation";
import { USER_TAB } from "../../constant";
import UserPostList from "@/modules/user/components/UserPostList";
import type { Metadata } from "next";

export default async function Page({ params }: PageProps<{ id: string }>) {
  const { id } = await params;
  if (!isValidUUID(id)) redirect("/");

  const { data, error } = await getUserById(id);

  if (error) redirect("/");
  if (!data) notFound();

  return (
    <User
      user={data}
      tabs={USER_TAB.map((el) => ({
        ...el,
        href: el.href.replace("[USER_ID]", data.id),
      }))}
      activeTab="media"
    >
      <UserPostList
        fetcher={async (payload) => {
          "use server";
          return getPostByUserId(id, payload, "t");
        }}
      />
    </User>
  );
}

export async function generateMetadata({
  params,
}: PageProps<{ id: string }>): Promise<Metadata> {
  const { id } = await params;
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
    keywords: [data.username, ...(data?.bio ?? "").split(" ")],
    creator: data.username,
    publisher: data.username,
  };
}

export const dynamicParams = true;

export const experimental_ppr = true;

export async function generateStaticParams() {
  return [];
}
