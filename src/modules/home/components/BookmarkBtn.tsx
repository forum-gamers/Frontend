"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import {
  memo,
  useOptimistic,
  useTransition,
  type MouseEventHandler,
} from "react";
import {
  BookmarkIcon,
  BookmarkSlashIcon,
} from "@/components/icons/HeroIconsSolid";
import { bookmarkPost, unBookmarkPost } from "../action";
import usePost from "../hooks/usePost";
import useBookmark from "@/modules/bookmark/hooks/useBookmark";

export interface BookmarkBtnProps extends ButtonProps {
  isBookmarked: boolean;
  countBookmark: number;
  postId: number;
}

function BookmarkBtn({
  isBookmarked,
  countBookmark,
  postId,
  ...rest
}: BookmarkBtnProps) {
  const { removeDatas, setDatas } = useBookmark();
  const { updateBookmark, datas } = usePost();
  const [pending, startTransition] = useTransition();
  const [bookmarked, optimisticBookmarked] = useOptimistic(
    isBookmarked,
    (prev: boolean) => !prev
  );
  const [count, optimisticCount] = useOptimistic(
    countBookmark,
    (prev: number) => prev + (isBookmarked ? -1 : 1)
  );

  const onCLickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    startTransition(async () => {
      optimisticBookmarked(bookmarked);
      optimisticCount(count);

      isBookmarked ? await unBookmarkPost(postId) : await bookmarkPost(postId);
      isBookmarked
        ? removeDatas(postId)
        : setDatas([datas.find((el) => el.id !== postId) as any]);

      updateBookmark(postId);
    });
  };

  return (
    <Button
      {...rest}
      onClick={onCLickHandler}
      variant="ghost"
      disabled={pending}
    >
      {bookmarked ? (
        <BookmarkSlashIcon className="h-6 w-6" />
      ) : (
        <BookmarkIcon className="h-6 w-6" />
      )}
      <span>{count}</span>
    </Button>
  );
}

export default memo(BookmarkBtn);
