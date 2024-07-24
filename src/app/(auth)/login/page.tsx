import { getServerSideSession } from "@/helpers/global";
import LoginPage from "@/modules/login";
import { redirect } from "next/navigation";

export default async function Page() {
  if (await getServerSideSession()) redirect("/");

  return <LoginPage />;
}

export const dynamic = "force-static";
