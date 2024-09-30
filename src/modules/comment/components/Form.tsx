"use client";

import SubmitBtn from "@/components/common/SubmitBtn";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useComment from "@/modules/comment/hooks/useComment";
import type { FormAction } from "@/interfaces";
import { useState, type ChangeEventHandler } from "react";
import { postAComment } from "../action";
import { swalError } from "@/lib/swal";
import usePost from "@/modules/home/hooks/usePost";
import useCsrf from "@/hooks/useCsrf";

export interface CommentFormProps {
  postId: number;
  disabled?: boolean;
}

export default function CommentForm({
  postId,
  disabled = false,
}: CommentFormProps) {
  const csrf = useCsrf();
  const { addComment } = useComment();
  const { updateCountComment } = usePost();
  const [text, setText] = useState<string>("");

  const actionHandler: FormAction = async (formData) => {
    if (!text || formData.get("csrf") !== csrf) return;

    formData.append("text", text);
    formData.append("postId", postId.toString());

    const { error, data } = await postAComment(formData);
    if (error) {
      swalError(error || "unexpected error");
      return;
    }

    if (data) {
      addComment(data);
      setText("");
      updateCountComment(postId);
      return;
    }

    swalError("Something went wrong");
  };

  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setText(e.target.value);

  return (
    <form action={actionHandler} id="comment-form" className="mb-6">
      <input type="hidden" name="csrf" value={csrf} id="csrf" />
      <div className="py-2 px-4 mb-4 bg-white dark:bg-[#202225] rounded-lg rounded-t-lg border border-gray-200 dark:border-gray-700">
        <Label htmlFor="comment" className="sr-only">
          Add a comment
        </Label>
        <Textarea
          name="comment"
          value={text}
          id="comment"
          placeholder="Write a comment..."
          onChange={onChangeHandler}
          disabled={disabled}
          className="text-neutral-900 dark:text-neutral-300 bg-gray-100 dark:bg-gray-600"
        />
      </div>
      <SubmitBtn
        text="Post Comment"
        type="submit"
        disabled={!text || disabled}
        className="hover:opacity-75 h-10 capitalize inline-flex bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out items-center py-2.5 px-4 text-xs font-medium text-center text-white rounded-lg focus:ring-4"
      />
    </form>
  );
}
