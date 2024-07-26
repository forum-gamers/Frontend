import { getServerSideSession } from "@/helpers/global";
import RegisterPage from "@/modules/register";
import { redirect } from "next/navigation";

export default async function Page() {
  if (await getServerSideSession()) redirect("/");
  return <RegisterPage />;
}
