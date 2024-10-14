"use client";

import type { Fetcher } from "@/hooks/useScroll";
import type { CustomSession } from "@/interfaces";
import type { PostResponse } from "@/interfaces/model";
import { memo } from "react";
import useCommunityPost from "../../hooks/useCommunityPost";
import PostList from "@/components/common/PostList";
import Init from "./InitPost";

export interface CommunityPostListProps {
  fetcher: Fetcher<PostResponse>;
  initialDatas: PostResponse[];
  session: CustomSession | null;
}

function CommunityPostList({
  fetcher,
  initialDatas,
  session,
}: CommunityPostListProps) {
  return (
    <div className='w-full'>
      <Init datas={initialDatas} />
      <PostList
        handler={useCommunityPost}
        fetcher={fetcher}
        session={session}
      />
    </div>
  );
}

export default memo(CommunityPostList);
