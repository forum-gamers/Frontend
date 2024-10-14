"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEventHandler,
} from "react";
import useTargetCommunity from "../../hooks/useTargetCommunity";
import type { CommunityAttributes } from "@/interfaces/model";
import type { OnFileChangeHandler } from "@/components/common/FileForm";
import type { FormAction } from "@/interfaces";
import { Label } from "@/components/ui/label";
import AnimateInput from "@/components/common/AnimateInput";
import { Textarea } from "@/components/ui/textarea";
import SubmitBtn from "@/components/common/SubmitBtn";
import FileForm from "@/components/common/FileForm";
import { SUPPORTED_IMAGE_TYPE } from "@/constants/global";
import { updateCommunity } from "../../action";
import { swalError } from "@/lib/swal";
import useCsrf from "@/hooks/useCsrf";

export interface ButtonEditProps {
  communityId: number;
}

function ButtonEdit({ communityId }: ButtonEditProps) {
  const csrf = useCsrf();
  const ref = useRef<HTMLFormElement>(null);
  const { data, setDatas } = useTargetCommunity();
  const [open, setOpen] = useState<boolean>(false);
  const [{ name, description }, setData] = useState<
    Pick<CommunityAttributes, "name" | "description">
  >({
    name: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    ref.current?.reset();
    if (data) {
      setData({
        name: data?.name ?? "",
        description: data?.description ?? "",
      });
    }
  }, [data]);

  const onFileChange: OnFileChangeHandler = useCallback(([file]) => {
    setFile(file);
  }, []);

  const onChangeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const actionHandler: FormAction = async (formData) => {
    if (
      (name !== data?.name && name.length < 3) ||
      (description !== data?.description &&
        !!description &&
        description.length < 3) ||
      formData.get("csrf") !== csrf
    )
      return;

    formData.delete("description");
    formData.delete("name");
    formData.delete("file");

    formData.append("communityId", String(communityId));
    if (file) formData.append("file", file);
    formData.append("name", name);
    if (description) formData.append("description", description);

    const { error, data: result } = await updateCommunity(formData);
    if (error) {
      setOpen(false);
      swalError(error);
      return;
    }

    if (result) {
      setDatas({
        ...result,
        totalMember: data?.totalMember ?? 0,
        totalPost: data?.totalPost ?? 0,
        isMember: data?.isMember ?? true,
        createdAt: result.createdAt.toString(),
        updatedAt: result.updatedAt.toString(),
        totalEvent: data?.totalEvent ?? 0,
      });
      setOpen(false);
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-none text-neutral-900 dark:text-neutral-300 w-40"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Community
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#202225]">
        <DialogHeader>
          <DialogTitle>Edit Community</DialogTitle>
          <DialogDescription>
            Make changes to your community here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <form
          ref={ref}
          action={actionHandler}
          className="space-y-4"
          id="edit-community"
        >
          <input type="hidden" name="csrf" value={csrf} />
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <AnimateInput
              name="name"
              id="name"
              value={name}
              onChange={onChangeHandler}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              value={description}
              onChange={onChangeHandler}
            />
          </div>

          <div className="space-y-4">
            <Label htmlFor="image">Upload Image</Label>
            <FileForm
              accept={SUPPORTED_IMAGE_TYPE}
              id="file"
              placeHolder="Add images"
              onFileChange={onFileChange}
              name="file"
              className="w-full h-4"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <SubmitBtn
              disabled={
                (name !== data?.name && name.length < 3) ||
                (description !== data?.description &&
                  !!description &&
                  description.length < 3)
              }
              type="submit"
              text="Save Changes"
              className="bg-blue-500 hover:bg-blue-600 p-2 font-normal min-w-[140px]"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(ButtonEdit);
