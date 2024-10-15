"use client";

import AnimateInput from "@/components/common/AnimateInput";
import SubmitBtn from "@/components/common/SubmitBtn";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { FormAction } from "@/interfaces";
import { cn } from "@/lib/utils";
import { memo, useCallback, useState, type ChangeEventHandler } from "react";
import { createCommunity } from "../action";
import { swalError } from "@/lib/swal";
import FileForm, {
  type OnFileChangeHandler,
} from "@/components/common/FileForm";
import useCommunity from "../hooks/useCommunity";
import useForm from "../hooks/useForm";
import { SUPPORTED_IMAGE_TYPE } from "@/constants/global";

function CreateCommunityForm() {
  const { setDatas } = useCommunity();
  const { setOpen } = useForm();
  const [{ name, description }, setData] = useState({
    name: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const onChangeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (e) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    },
    [setData]
  );

  const formAction: FormAction = async (formData) => {
    if ((!name && name.length < 3) || (!!description && description.length < 3))
      return;

    formData.delete("description");
    formData.delete("name");
    formData.delete("file");

    if (file) formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);

    const { data, error } = await createCommunity(formData);

    if (error) {
      setOpen(false);
      swalError(error);
      return;
    }

    if (data) {
      setOpen(false);
      setDatas([
        {
          ...data,
          totalMember: 1,
          totalPost: 0,
          isMember: true,
          createdAt: data.createdAt.toString(),
          updatedAt: data.updatedAt.toString(),
          totalEvent: 0,
        },
      ]);
      return;
    }

    swalError("Something went wrong");
  };

  const onFileChange: OnFileChangeHandler = useCallback(
    ([file]) => setFile(file),
    [setFile]
  );

  return (
    <form id="create-community-form" className="space-y-4" action={formAction}>
      <div className="space-y-2">
        <Label
          className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-300 after:content-['*'] after:ml-0.5 after:text-red-500"
          htmlFor="name"
        >
          Community Name
        </Label>
        <AnimateInput
          id="name"
          name="name"
          required
          value={name}
          pattern="{3,}$"
          title="name must be at least 3 characters long."
          className={cn(
            "border border-gray-300 text-gray-900",
            "appearance-none sm:text-sm rounded-lg focus:blue-600 focus:border-teal-600 block w-full p-2.5",
            "bg-gray-100 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          )}
          onChange={onChangeHandler}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          className={cn(
            "min-h-[150px] p-3 h-40 outline-none w-full px-3 py-2 focus:ring-opacity-50 transition-all duration-200 ease-in-out",
            "text-neutral-900 dark:text-neutral-300 bg-gray-100 dark:bg-gray-600 rounded-md border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500",
            "shadow-sm stroke-slate-50 dark:stroke-slate-900 shadow-white dark:shadow-gray-900"
          )}
          spellCheck
          placeholder="Write your description..."
          value={description}
          rows={4}
          onChange={onChangeHandler}
          title="description must be at least 3 characters long."
        />
      </div>
      <div className="space-y-4">
        <Label htmlFor="image">Upload Image</Label>
        <FileForm
          accept={SUPPORTED_IMAGE_TYPE}
          multiple
          id="file"
          max={4}
          placeHolder="Add images"
          onFileChange={onFileChange}
          name="file"
          className="w-full h-4"
        />
      </div>
      <SubmitBtn
        text="Create community"
        disabled={name.length < 3 || (!!description && description.length < 3)}
        type="submit"
        className={cn(
          "w-full py-3 px-4 inline-flex justify-center items-center gap-2 ",
          "rounded-md border border-transparent font-semibold transition-all text-sm",
          "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        )}
      />
    </form>
  );
}

export default memo(CreateCommunityForm);
