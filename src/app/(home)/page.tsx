import Home from "@/modules/home";
import { fetchPosts } from "./action";
import { getServerSideSession } from "@/helpers/global";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSideSession();
  if (!session) redirect("/login");

  const { data } = await fetchPosts(session?.user?.access_token ?? "");

  return <Home datas={data} session={session}/>;
}
