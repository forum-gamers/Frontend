"use client";

import {
  useState,
  useTransition,
  type ChangeEvent,
  type KeyboardEventHandler,
  type TextareaHTMLAttributes,
} from "react";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { swalError } from "@/lib/swal";
import { editPostText } from "../action";

export interface EditableTextProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  text?: string;
  id: string;
  name: string;
  label: string;
  postId: number;
  onComplete: (newText: string) => void;
}

export default function EditablePostText({
  text,
  id,
  name,
  label,
  postId,
  onComplete,
  ...rest
}: EditableTextProps) {
  const [editableText, setEditableText] = useState<string>(text || "");
  const [valid, setValid] = useState<boolean>(true);
  const [pending, startTransition] = useTransition();

  const validateCharacter = (text: string) =>
    /^(?=.*\S)[a-zA-Z0-9.,!?'"()\-\n ]{1,2000}$/.test(text);

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditableText(e.target.value);
    setValid(validateCharacter(e.target.value));
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (!editableText || !valid) return;

    if (e.key === "Enter" && !e.shiftKey)
      startTransition(async () => {
        const { error } = await editPostText(editableText, postId);
        if (error) {
          swalError(error || "unexpected error");
          return;
        }
        onComplete(editableText);
      });
  };

  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={id} className=" font-bold text-lg px-4 antialiased">
        {label}
      </Label>
      <Textarea
        {...rest}
        id={id}
        onChange={onChangeHandler}
        value={editableText}
        name={name}
        disabled={pending}
        onKeyDown={handleKeyDown}
      />
      {editableText !== text && valid && (
        <p className="antialiased">Press enter to save</p>
      )}
      {!valid && (
        <p className="text-red-500">
          Bio must be between 10 and 160 characters and can only contain
          letters, numbers, and basic punctuation.
        </p>
      )}
    </div>
  );
}
