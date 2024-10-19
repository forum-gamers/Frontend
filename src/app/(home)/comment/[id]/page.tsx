import { getServerSideSession } from "@/helpers/global";
import type { PageProps } from "@/interfaces";
import Comment from "@/modules/comment";
import { fetchPostComment } from "@/modules/comment/action";
import { fetchPostById } from "@/modules/feed/action";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params: { id },
}: PageProps<{ id: string }>) {
  const value = parseInt(id);
  if (isNaN(value)) redirect("/");

  const [{ data = [] }, { data: post }, session] = await Promise.all([
    fetchPostComment(value, {}),
    fetchPostById(value),
    getServerSideSession(),
  ]);

  if (!post) notFound();

  return <Comment datas={data} post={post} session={session} />;
}

export async function generateMetadata({
  params: { id },
}: PageProps<{ id: string }>): Promise<Metadata> {
  const value = parseInt(id);
  if (isNaN(value)) return {};

  const { data, error } = await fetchPostById(value);
  if (!data || error) return {};

  return {
    description: data.text.substring(0, 100),
    title: `Post ${data.id} Comment`,
    keywords: [
      "comment",
      "comment post",
      "comment forum",
      ...data.text.split(" "),
      data.username,
    ],
  };
}
