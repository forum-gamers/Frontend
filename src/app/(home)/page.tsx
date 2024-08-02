import Home from "@/modules/home";
import { fetchPosts } from "@/modules/home/action";
import { getServerSideSession } from "@/helpers/global";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSideSession();
  if (!session) redirect("/login");

  const { data } = await fetchPosts({});

  return <Home datas={data} session={session} />;
}
