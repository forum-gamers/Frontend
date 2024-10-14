"use client";

import { memo, useId, useRef, type ChangeEventHandler } from "react";
import PriorityImage from "./PriorityImage";
import { Button } from "../ui/button";
import Pencil from "../svg/Pencil";
import { cn } from "@/lib/utils";
import type { FormAction } from "@/interfaces";
import type { StaticImageData } from "next/image";
import Loader from "../svg/Loader";

export interface EditableImageProps {
  src: string | StaticImageData;
  alt: string;
  wrapperClassName?: string;
  imageClassName?: string;
  w: number;
  h: number;
  text?: string;
  name: string;
  onAction: FormAction;
  disable: boolean;
}

function EditableImage({
  src,
  alt,
  wrapperClassName = "",
  imageClassName = "",
  w,
  h,
  text = "Edit Image",
  name,
  onAction,
  disable,
}: EditableImageProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openInput = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const inputId = useId();

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e?.target?.files?.length || !formRef.current) return;

    const file = e.target.files[0];
    const formData = new FormData(formRef.current);

    formData.append("file", file);
    formRef.current.requestSubmit();
  };

  return (
    <figure
      className={cn("group relative", wrapperClassName, "!overflow-hidden")}
    >
      <PriorityImage
        src={src}
        alt={alt}
        width={w}
        height={h}
        className={cn(imageClassName, "max-w-full max-h-full object-cover")}
      />
      <div className="absolute inset-0 bg-black/50 p-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {disable ? (
          <Loader />
        ) : (
          <Button
            variant="link"
            className="bg-white/50 transition-colors"
            onClick={openInput}
            type="button"
            disabled={disable}
          >
            <Pencil className="w-2 h-2 mr-2" />
            {text}
          </Button>
        )}
      </div>
      <form ref={formRef} className="hidden" action={onAction}>
        <input
          className="hidden"
          name={name}
          onChange={onChangeHandler}
          type="file"
          ref={inputRef}
          id={inputId}
        />
      </form>
    </figure>
  );
}

export default memo(EditableImage);
