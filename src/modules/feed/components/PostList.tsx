"use client";

import type { CustomSession } from "@/interfaces";
import usePost from "../hooks/usePost";
import { fetchPosts } from "../action";
import { memo } from "react";
import PostList from "@/components/common/PostList";

export interface PostListProps {
  session: CustomSession | null;
}

function PostSection({ session }: PostListProps) {
  return <PostList handler={usePost} fetcher={fetchPosts} session={session} />;
}

export default memo(PostSection);
