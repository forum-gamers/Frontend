import type { PageProps } from "@/interfaces";
import Comment from "@/modules/comment";
import { fetchPostComment } from "@/modules/comment/action";
import { redirect } from "next/navigation";

export default async function Page({
  params: { id },
}: PageProps<{ id: string }>) {
  const value = parseInt(id);
  if (isNaN(value)) redirect("/");

  const { data } = await fetchPostComment(value);

  return <Comment datas={data} />;
}
