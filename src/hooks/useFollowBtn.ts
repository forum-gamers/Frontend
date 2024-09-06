import useComment from "@/modules/comment/hooks/useComment";
import usePost from "@/modules/home/hooks/usePost";
import { follow, unFollow } from "@/modules/user/action";
import useProfile from "@/modules/user/hooks/useProfile";
import useRecomendation from "@/modules/user/hooks/useRecomendation";
import useTargetProfile from "@/modules/user/hooks/useTargetProfile";
import { useParams } from "next/navigation";
import {
  useCallback,
  useMemo,
  useOptimistic,
  useTransition,
  type MouseEventHandler,
} from "react";

export interface UseFollowBtnProps {
  isFollowed: boolean;
  id: string;
}

export default function useFollowBtn({ isFollowed, id }: UseFollowBtnProps) {
  const params = useParams();
  const { updateFollow } = useRecomendation();
  const { toogleFollow: postToggle } = usePost();
  const { toggleFollow: commentToggle } = useComment();

  const [pending, startTransition] = useTransition();

  const { updateUserFollowing: updateMeFollowing } = useProfile();
  const { updateUserFollower: updateTargetFollower, target } =
    useTargetProfile();

  const followed = useMemo(
    () =>
      params && params.id === id ? target?.isFollower ?? false : isFollowed,
    [
      params,
      target,
      id,
      updateMeFollowing,
      updateTargetFollower,
      target?.isFollower,
    ]
  );

  const [optimisticIsFollowed, optimisticIsFollowedHandler] = useOptimistic(
    followed,
    (newState: boolean) => newState
  );

  const handleFollowBtn: MouseEventHandler = useCallback(
    (e) => {
      startTransition(async () => {
        console.log(followed);
        optimisticIsFollowedHandler(!followed);
        followed ? await unFollow(id) : await follow(id);
        updateTargetFollower(followed ? "decrement" : "increment");
        updateMeFollowing(followed ? "decrement" : "increment");
        updateFollow(id);
        postToggle(id);
        commentToggle(id);
      });
    },
    [
      optimisticIsFollowed,
      id,
      updateTargetFollower,
      updateMeFollowing,
      updateFollow,
      postToggle,
      commentToggle,
      optimisticIsFollowedHandler,
    ]
  );

  return { pending, optimisticIsFollowed, handleFollowBtn };
}
