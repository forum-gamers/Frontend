import { getServerSideSession } from "@/helpers/global";
import ForgetPassword from "@/modules/reset-password/forget";

export default async function Page() {
  const session = await getServerSideSession();

  return <ForgetPassword session={session} />;
}

export const dynamic = "force-static";
