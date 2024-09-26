import ConnectionError from "@/modules/error/connection";

export default function Page() {
  return <ConnectionError />;
}

export const dynamic = "force-static";
