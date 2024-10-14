"use client";

import CreatePostForm from "@/modules/home/components/Form";
import { memo, useCallback } from "react";
import useCommunityPost from "../../hooks/useCommunityPost";
import type { PostResponse } from "@/interfaces/model";

export interface CreatePostCommunityFormProps {
  communityId: number;
}

function CreatePostCommunityForm({
  communityId,
}: CreatePostCommunityFormProps) {
  const { setDatas } = useCommunityPost();

  const onSuccessHandler = useCallback((props: PostResponse) => {
    setDatas([props]);
  }, []);

  return (
    <CreatePostForm communityId={communityId} onSuccess={onSuccessHandler} />
  );
}

export default memo(CreatePostCommunityForm);
