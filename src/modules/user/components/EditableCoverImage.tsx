"use client";

import { memo, useCallback, useTransition } from "react";
import useProfile from "../hooks/useProfile";
import type { FormAction } from "@/interfaces";
import { swalError } from "@/lib/swal";
import { updateImg } from "../action";
import EditableImage from "@/components/common/EditableImage";
import { BACKDROP } from "@/components/images";

function EditableCover() {
  const [pending, startTransition] = useTransition();
  const { me, updateImage } = useProfile();

  const handleUpload: FormAction = useCallback(
    async (formData) => {
      startTransition(async () => {
        formData.append("field", "background");
        const { error, data } = await updateImg(formData);
        if (error) {
          swalError(error || "unexpected error");
          return;
        }

        if (data) {
          updateImage("backgroundImageUrl", data);
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
      src={me?.backgroundImageUrl || BACKDROP}
      alt="cover"
      onAction={handleUpload}
      imageClassName="w-full rounded-md"
      w={450}
      h={150}
      name="file"
    />
  );
}

export default memo(EditableCover);
