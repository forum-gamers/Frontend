import Home from "@/modules/home";
import { fetchPosts } from "@/modules/home/action";
import { getServerSideSession } from "@/helpers/global";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { revalidatePath } from "next/cache";

export default async function Page() {
  const session = await getServerSideSession();
  if (!session) redirect("/login");
  revalidatePath("/");

  const { data } = await fetchPosts({});

  return <Home datas={data} session={session} />;
}

export const metadata: Metadata = {
  title: "Forum Gamers",
  description: "Social media and forum for gamer",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "forum",
    "forum gamers",
    "forum gaming",
    "social media",
    "gaming",
    "gamers",
  ],
  applicationName: "Forum Gamers",
  authors: [
    {
      name: "Lord Feexz",
      url: "https://github.com/LordFeexz",
    },
  ],
  creator: "Lord Feexz",
  category: "Social Media",
  publisher: "Lord Feexz",
  twitter: {
    title: "Forum Gamers",
    description: "Social media and forum for gamer",
    card: "summary",
    creator: "Lord Feexz",
    site: "https://x.com/_Forum_Gamers_",
  },
};
