import { getServerSideSession } from "@/helpers/global";
import BookmarkPage from "@/modules/bookmark";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSideSession();

  if (!session) redirect("/login");

  return <BookmarkPage session={session} />;
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  description: "your favorite posts",
  keywords: ["bookmark", "bookmark posts", "favorite posts", "forum gamers"],
};
