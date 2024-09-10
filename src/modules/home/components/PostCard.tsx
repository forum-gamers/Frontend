"use client";

import type { PostResponse } from "@/interfaces/model";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components/ui/card";
import TruncateCardText from "../../../components/common/TruncateCardText";
import LazyLoadImg from "../../../components/common/LazyLoadImage";
import {
  Fragment,
  memo,
  useCallback,
  useState,
  type ChangeEventHandler,
} from "react";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import ProfilePic from "../../../components/common/ProfilePic";
import Timestamp from "../../../components/common/Timestamp";
import VideoPlayer from "@/components/common/VideoPlayer";
import type { CustomSession } from "@/interfaces";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PencilSquareIcon } from "@/components/icons/HeroIconsSolid";
import { swalAskDelete, swalError } from "@/lib/swal";
import { deletePost } from "../action";
import usePost from "../hooks/usePost";
import EditableText from "@/modules/home/components/EditableText";
import { Badge } from "@/components/ui/badge";
import BookmarkBtn from "./BookmarkBtn";

export interface PostCardProps {
  data: PostResponse;
  session: CustomSession | null;
  as?: "page" | "card";
  dataAos: "fade-left" | "fade-right" | "fade-up";
}

function PostCard({
  data: {
    username,
    userImageUrl,
    createdAt,
    text,
    medias,
    id,
    userId,
    isBookmarked,
    isLiked,
    userBio,
    countLike,
    countComment,
    editedText,
    countBookmark,
    isFollowed,
    userCreatedAt,
    userBackgroundImageUrl,
  },
  session,
  as = "card",
  dataAos,
}: PostCardProps) {
  const { deletePost: deletePostFromCtx, editPostText } = usePost();
  const [editable, setEditable] = useState<boolean>(false);
  const [postText, setPostText] = useState<string>(text);

  const onChangeEditable = useCallback(
    () => setEditable(!editable),
    [editable]
  );

  const onTextChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setPostText(e.target.value),
    []
  );

  const deleteHandler = useCallback(() => {
    swalAskDelete({
      confirmText: "Delete",
      onConfirm: () => {
        deletePost(id)
          .then(({ error }) => {
            if (error) {
              swalError(error || "Unexpected error");
              return;
            }
            deletePostFromCtx(id);
          })
          .catch((err) => {
            swalError(err?.message || "Unexpected error");
          });
      },
      onCancel: () => swalError("Canceled"),
    });
  }, [id, deletePostFromCtx]);

  const onComplete = useCallback(
    (text: string) => {
      setEditable(false);
      setPostText(text);
      editPostText(text, id);
    },
    [editPostText, id]
  );

  return (
    <Card
      data-aos={dataAos}
      data-aos-duration="500"
      className="bg-white dark:bg-dark-theme-500"
    >
      <CardHeader className="flex flex-row gap-2 items-center space-y-0 pb-2">
        <ProfilePic
          createdAt={userCreatedAt}
          backgroundUrl={userBackgroundImageUrl}
          isFollowed={isFollowed}
          bio={userBio}
          src={userImageUrl}
          alt={`${username} profile picture`}
          username={username}
          id={userId}
          session={session}
        />
        <hgroup className="w-full text-xs antialiased">
          <p>{username}</p>
          <Timestamp timestamp={createdAt} />
        </hgroup>
        {session && session?.user?.id === userId && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <PencilSquareIcon className="w-5 h-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onChangeEditable}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={deleteHandler}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent className="mt-4">
        {!!text &&
          (editable ? (
            <EditableText
              onComplete={onComplete}
              id="post-text"
              label="edit text"
              text={postText}
              name="text"
              onChange={onTextChange}
              spellCheck
              autoFocus
              className="p-3 h-60 border border-sm-blue dark:border-d-sm-blue outline-none"
              placeholder={postText}
              postId={id}
            />
          ) : (
            <TruncateCardText text={postText} />
          ))}
        {editedText && (
          <Badge className="h-4 w-[3.75rem]" variant="outline">
            <span className="text-xs p-0">(edited)</span>
          </Badge>
        )}
        {!!medias?.length && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8 mx-auto px-2">
            {medias.map((el) => (
              <Fragment key={el.fileId}>
                {el.type === "image" ? (
                  <LazyLoadImg
                    className="py-1 hover:scale-105"
                    src={el.url}
                    alt="post image"
                    width={400}
                    height={300}
                  />
                ) : (
                  <VideoPlayer
                    src={el.url}
                    alt="post video"
                    width={400}
                    height={300}
                    className="py-1 hover:scale-105"
                  />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <LikeButton
          totalLike={countLike}
          postId={id}
          isLiked={isLiked}
          className="hover:bg-slate-200 gap-2"
        />
        {as === "card" && (
          <CommentButton
            countComment={countComment}
            postId={id}
            className="hover:bg-slate-200 gap-2"
          />
        )}
        <BookmarkBtn
          postId={id}
          countBookmark={countBookmark}
          isBookmarked={isBookmarked}
        />
      </CardFooter>
    </Card>
  );
}

export default memo(PostCard);
