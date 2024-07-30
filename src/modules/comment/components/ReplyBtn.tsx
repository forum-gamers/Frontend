"use client";

import { useState, type ChangeEventHandler } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Textarea } from "../../../components/ui/textarea";
import SubmitBtn from "../../../components/common/SubmitBtn";
import type { FormAction } from "@/interfaces";
import { replyComment } from "../action";
import { swalError } from "@/lib/swal";
import { Button } from "../../../components/ui/button";
import useComment from "@/hooks/useComment";
import usePost from "@/hooks/usePost";

export interface ReplyBtnProps {
  commentId: number;
  userId: string;
}

export default function ReplyBtn({ commentId, userId }: ReplyBtnProps) {
  const { addReply } = useComment();
  const { updateCountComment } = usePost();
  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setText(e.target.value);

  const actionHandler: FormAction = async (formData) => {
    if (!text) return;
    formData.append("commentId", commentId.toString());
    formData.append("userId", userId);
    formData.append("text", text);

    const { error, data } = await replyComment(formData);
    if (error) {
      swalError(error || "unexpected error");
      return;
    }

    if (data) {
      addReply(data);
      updateCountComment(data.postId);
    }

    setOpen(false);
    setText("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger onClick={() => setOpen(true)}>
        <Button variant="ghost" className="hover:bg-slate-200 gap-2">
          Reply
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <form id="reply-form" action={actionHandler}>
          <div className="px-3 mb-2 mt-2">
            <Textarea
              value={text}
              name="text"
              onChange={onChangeHandler}
              placeholder="Write a reply..."
              className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
            />
          </div>
          <div className="flex justify-end px-4">
            <SubmitBtn
              text="Reply"
              disabled={!text}
              className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500"
            />
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
