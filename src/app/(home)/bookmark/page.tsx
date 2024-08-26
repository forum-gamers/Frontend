import { getServerSideSession } from "@/helpers/global";
import BookmarkPage from "@/modules/bookmark";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSideSession();

  if (!session) redirect("/login");

  return <BookmarkPage session={session} />;
}

export const dynamic = "force-dynamic";
