"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useCallback, useMemo, useState, type ChangeEventHandler } from "react";
import { WindowIcon } from "@/components/icons/HeroIconsOutline";
import type { FormAction } from "@/interfaces";
import { Textarea } from "@/components/ui/textarea";
import FileForm, {
  type OnFileChangeHandler,
} from "@/components/common/FileForm";
import SubmitBtn from "@/components/common/SubmitBtn";
import { createPost } from "../action";
import { swalError } from "@/lib/swal";
import usePost from "../hooks/usePost";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function CreatePostForm() {
  const privacyValues = useMemo(
    () => ["public", "private", "friend-only"] as const,
    []
  );
  const { addPost } = usePost();
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [privacy, setPrivacy] =
    useState<(typeof privacyValues)[number]>("public");
  const [files, setFiles] = useState<File[]>([]);
  const [allowComment, setAllowComment] = useState<boolean>(true);

  const actionHandler: FormAction = async (formData) => {
    if (!text && !files.length) return;

    formData.append("text", text);
    formData.append("allowComment", String(allowComment));
    formData.append("privacy", privacy);
    for (const file of files) formData.append("files", file);

    const { error, data } = await createPost(formData);
    if (error) {
      swalError(error || "unexpected error");
      return;
    }

    if (data) {
      addPost(data);
      setOpen(false);
      setText("");
      setFiles([]);
      return;
    }
  };

  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setText(e.target.value),
    []
  );

  const onFileChange: OnFileChangeHandler = useCallback(
    (files) => setFiles(files),
    []
  );

  const onPrivacyChange: ChangeEventHandler<HTMLSelectElement> = useCallback(
    (e) => setPrivacy(e.target.value as (typeof privacyValues)[number]),
    [privacyValues, privacy]
  );

  const onCommentChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => setAllowComment(e.target.checked),
    [allowComment]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        className="sm:max-w-3xl flex items-center bg-background dark:bg-[#1C2541]"
      >
        <div
          className={cn(
            "flex h-24 flex-row shadow-blue-300 dark:shadow-blue-900 shadow-sm bg-background border-4 mb-4 justify-evenly items-center max-w-3xl px-8 py-20 gap-4 w-full mx-auto rounded-lg",
            "bg-background dark:bg-[#1C2541]"
          )}
        >
          <WindowIcon className="w-6 h-6" />
          <Button
            variant="link"
            className="rounded-md flex-1 justify-start text-neutral-900 dark:text-neutral-300 bg-background dark:bg-[#1C2541]"
          >
            Create your post
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-row justify-center fixed w-[80%] lg:mr-12 mt-10 rounded-md min-h-72 transition-all duration-500 shadow-lg max-w-2xl bg-white dark:bg-black p-0">
        <form
          action={actionHandler}
          id="post-form"
          className="w-full flex flex-col px-2 py-2 m-2"
        >
          <Textarea
            name="text"
            value={text}
            onChange={onChangeHandler}
            id="text"
            placeholder="Describe everything about this post here"
            spellCheck
            className="p-3 h-60 border border-sm-blue dark:border-d-sm-blue outline-none"
          />
          <div className="mt-4">
            <Label
              htmlFor="allowComment"
              className="ml-2 text-gray-700 dark:text-gray-300"
            >
              Allow Comments
            </Label>
            <Input
              type="checkbox"
              id="allowComment"
              name="allowComment"
              checked={allowComment}
              onChange={onCommentChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>

          <div className="mt-4">
            <Label
              htmlFor="privacy"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Privacy
            </Label>
            <select
              id="privacy"
              name="privacy"
              value={privacy}
              onChange={onPrivacyChange}
              className="block w-full mt-1 p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-300 dark:focus:border-blue-300"
            >
              {privacyValues.map((value) => (
                <option key={value} value={value} className="capitalize">
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row my-2 py-2 px-2 justify-between items-center hover:cursor-pointer">
            <FileForm
              accept={[
                "image/png",
                "image/jpg",
                "image/jpeg",
                "image/gif",
                "image/bmp",
                "video/mp4",
                "video/avi",
                "video/mpeg",
                "video/quicktime",
                "video/webm",
                "video/3gp",
                "video/mp3",
              ]}
              multiple
              id="file"
              max={4}
              placeHolder="Add images or video"
              onFileChange={onFileChange}
              name="file"
              className="w-full h-4"
            />

            <SubmitBtn
              disabled={!text && !files.length}
              className="flex justify-center items-center shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              text="Post"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
