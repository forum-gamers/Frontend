import { getMyLikedPost } from "@/modules/home/action";
import { ME_TAB } from "../../constant";
import UserPostList from "@/modules/user/components/UserPostList";
import MeIndex from "@/modules/user/meIndex";

export default function Page() {
  return (
    <MeIndex tabs={ME_TAB} activeTab="like" lang="en">
      <UserPostList fetcher={getMyLikedPost} />
    </MeIndex>
  );
}

export const dynamic = "force-dynamic";
