"use client";

import EditableImage from "@/components/common/EditableImage";
import { memo, useCallback, useTransition } from "react";
import useProfile from "../hooks/useProfile";
import { GUEST } from "@/components/images";
import type { FormAction } from "@/interfaces";
import { updateImg } from "../action";
import { swalError } from "@/lib/swal";

function EditableProfile() {
  const [pending, startTransition] = useTransition();
  const { me, updateImage } = useProfile();

  const handleUpload: FormAction = useCallback(
    async (formData) => {
      startTransition(async () => {
        formData.append("field", "profile");
        const { error, data } = await updateImg(formData);
        if (error) {
          swalError(error || "unexpected error");
          return;
        }

        if (data) {
          updateImage("imageUrl", data);
          return;
        }

        swalError("unexpected error");
      });
    },
    [updateImg, updateImage, me]
  );

  return (
    <EditableImage
      disable={pending}
      src={me?.imageUrl || GUEST}
      alt="profile"
      onAction={handleUpload}
      imageClassName="lg:hover:scale-105 rounded-full mx-auto object-cover aspect-square"
      w={100}
      h={100}
      name="file"
      wrapperClassName="rounded-full overflow-hidden border-2 cursor-pointer border-white shadow-md dark:border-neutral-800 flex justify-center items-center"
    />
  );
}

export default memo(EditableProfile);
