import { getServerSideSession } from "@/helpers/global";
import BookmarkPage from "@/modules/bookmark";
import { fetchBookmark } from "@/modules/bookmark/action";
import { redirect } from "next/navigation";

export default async function Page() {
  const [session, { data, error }] = await Promise.all([
    getServerSideSession(),
    fetchBookmark({}),
  ]);

  if (error) redirect("/");

  if (!session) redirect("/login");

  return <BookmarkPage session={session} datas={data} />;
}

export const dynamic = "force-dynamic";
