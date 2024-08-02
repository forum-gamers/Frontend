import type { PageProps } from "@/interfaces";
import Comment from "@/modules/comment";
import { fetchPostComment } from "@/modules/comment/action";
import { fetchPostById } from "@/modules/home/action";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  params: { id },
}: PageProps<{ id: string }>) {
  const value = parseInt(id);
  if (isNaN(value)) redirect("/");

  const [{ data = [] }, { data: post }] = await Promise.all([
    fetchPostComment(value),
    fetchPostById(value),
  ]);

  if (!post) notFound();

  return <Comment datas={data} post={post} />;
}
