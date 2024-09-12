"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  memo,
  useCallback,
  useMemo,
  useState,
  type ChangeEventHandler,
} from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import ChevronDown from "@/components/svg/ChevronDown";

function CreatePostForm() {
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
      setOpen(false);
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

  const onPrivacyChange = useCallback(
    (e: (typeof privacyValues)[number]) => setPrivacy(e),
    [privacyValues, privacy]
  );

  const onCommentChange = useCallback(
    () => setAllowComment(!allowComment),
    [allowComment]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        className="flex items-center cursor-pointer hover:opacity-85 transition-opacity duration-100 dark:hover:opacity-60 bg-white dark:bg-[#202225] justify-between p-4 rounded-lg"
      >
        <div
          className={cn(
            "h-auto flex-row shadow-white dark:shadow-black shadow-sm bg-white dark:bg-[#202225] w-full max-w-3xl  border-4 mb-4 justify-between items-center px-8 py-4 gap-4 rounded-lg",
            "inline-flex"
          )}
        >
          <WindowIcon className="w-6 h-6" />
          <Button
            variant="link"
            className="rounded-md justify-start text-neutral-900 dark:text-neutral-300 bg-transparent"
          >
            Create your post
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-[#202225]">
        <DialogHeader>
          <p className="font-bold text-lg">Create your post</p>
        </DialogHeader>
        <form action={actionHandler} id="post-form" className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Textarea
              id="text"
              placeholder="Write your post..."
              className="min-h-[150px] p-3 h-60 border outline-none"
              onChange={onChangeHandler}
              value={text}
              name="text"
              spellCheck
            />
          </div>
          <div className="flex gap-4 items-center justify-between bg-white dark:bg-[#202225]">
            <div className="flex items-center space-x-2">
              <Switch
                id="comments"
                aria-label="Allow comments"
                onCheckedChange={onCommentChange}
                checked={allowComment}
                name="allowComment"
                value={allowComment.toString()}
              />{" "}
              <Label
                htmlFor="comments"
                className="flex items-center gap-2 text-sm font-medium"
              >
                Allow Comments
              </Label>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1">
                  <span className="capitalize">{privacy}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {privacyValues.map((el) => (
                  <DropdownMenuItem
                    key={el}
                    onClick={() => onPrivacyChange(el)}
                    className="capitalize"
                  >
                    {el}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-4">
            <Label htmlFor="image">Upload Image</Label>
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
          </div>
          <SubmitBtn
            text="publish"
            disabled={!text && !files.length}
            className="bg-light-theme-200 dark:bg-dark-theme-200 transition-opacity duration-150 hover:opacity-75 h-12 capitalize"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(CreatePostForm);
