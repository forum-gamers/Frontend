"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState, type ChangeEventHandler } from "react";
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

export default function CreatePostForm() {
  const { addPost } = usePost();
  const [open, setOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);

  const actionHandler: FormAction = async (formData) => {
    if (!text || !files.length) return;

    formData.append("text", text);
    formData.append("allowComment", true.valueOf().toString());
    formData.append("privacy", "public");
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

  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (e) =>
    setText(e.target.value);

  const onFileChange: OnFileChangeHandler = (files) => {
    setFiles(files);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="sm:max-w-3xl flex items-center">
        <div
          className={cn(
            "flex h-24 flex-row justify-evenly items-center max-w-3xl px-8 py-20 gap-4 w-full bg-gradient-to-blue lg:from-lg-blue bg-lg-blue to-xl-blue dark:from-d-lg-blue lg:dark:bg-d-lg-blue dark:to-d-xl-blue rounded-lg",
            open && "hidden"
          )}
        >
          <WindowIcon className="w-6 h-6" />
          <Button className="rounded-md flex-1 justify-start bg-xs-blue dark:bg-d-xs-blue hover:bg-xs-blue h-24 hover:dark:bg-d-xs-blue">
            Create your post
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-row justify-center fixed w-[80%] lg:mr-12 mt-10 rounded-md min-h-72 transition-all duration-500 shadow-lg max-w-2xl bg-white dark:bg-black p-0">
        <form
          action={actionHandler}
          id="post-form"
          className="w-full flex flex-col px-2 py-2 m-2 lg:from-lg-blue bg-lg-blue to-xl-blue dark:from-d-lg-blue lg:dark:bg-d-lg-blue dark:to-d-xl-blue"
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
          <div className="flex flex-row my-2 py-2 px-2 justify-between items-center">
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
