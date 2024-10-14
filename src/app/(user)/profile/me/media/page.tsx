import { getMyPost } from "@/modules/home/action";
import { ME_TAB } from "../../constant";
import UserPostList from "@/modules/user/components/UserPostList";
import MeIndex from "@/modules/user/meIndex";

export default function Page() {
  return (
    <MeIndex tabs={ME_TAB} activeTab="media" lang="en">
      <UserPostList
        fetcher={async (payload) => {
          "use server";
          return getMyPost(payload, "t");
        }}
      />
    </MeIndex>
  );
}

export const dynamic = "force-dynamic";
