"use client";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  memo,
  useCallback,
  useRef,
  useState,
  useTransition,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from "react";
import { updateBio } from "../action";
import { swalError } from "@/lib/swal";
import TruncateCardText from "@/components/common/TruncateCardText";
import useProfile from "../hooks/useProfile";

export interface UpdateBioProps {
  bio: string;
  max?: number;
  className?: string;
}

function UpdatableBio({ bio, max = 60, className }: UpdateBioProps) {
  const [pending, startTransition] = useTransition();
  const [truncate, setTruncate] = useState<boolean>(bio.length > max);
  const [text, setText] = useState<string>(bio);
  const [valid, setValid] = useState<boolean>(true);
  const ref = useRef<HTMLTextAreaElement>(null);
  const { updateBio: updateBioProfile } = useProfile();
  const [isTextChanged, setIsTextChanged] = useState<boolean>(text !== bio);

  const handleOpenForm = useCallback(() => {
    setTruncate(false);
    ref.current?.focus();
  }, []);

  const validateCharacter = useCallback(
    (data: string) => /^(?=.*\S)[a-zA-Z0-9.,!?'"()\-\n ]{0,160}$/.test(data),
    [text, valid]
  );

  const onChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      setText(e.target.value);
      setValid(validateCharacter(e.target.value));
      setIsTextChanged(true);
    },
    [text, valid]
  );

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      if (!text || !valid) return;

      if (e.key === "Enter" && !e.shiftKey)
        startTransition(async () => {
          const formdata = new FormData();
          formdata.append("bio", text);
          const { error } = await updateBio(formdata);
          if (error) {
            swalError(error || "Unexpected error");
            return;
          }

          setTruncate(true);
          updateBioProfile(text);
          setIsTextChanged(false);
        });
    },
    [text, valid]
  );

  return (
    <>
      {truncate ? (
        <TruncateCardText
          className={cn(
            "antialiased tracking-tight text-xs border-none resize-none outline-none p-0",
            "dark:text-neutral-300 text-neutral-900",
            truncate ? "truncate h-8 block" : "text-left h-32",
            className
          )}
          onClick={handleOpenForm}
          text={text}
        />
      ) : (
        <Textarea
          id="bio"
          className={cn(
            "antialiased tracking-tight text-xs border-none resize-none outline-none p-0",
            "dark:text-neutral-300 text-neutral-900",
            truncate ? "truncate h-8 block" : "text-left h-12",
            className
          )}
          value={text}
          disabled={pending}
          name="bio"
          placeholder="Write something about yourself"
          onChange={onChangeHandler}
          onKeyDown={handleKeyDown}
          ref={ref}
          onClick={handleOpenForm}
        />
      )}
      {isTextChanged && valid && (
        <p className="antialiased">Press enter to save</p>
      )}
      {!valid && (
        <p className="text-red-500 text-xs">
          Bio must be between 10 and 160 characters and can only contain
          letters, numbers, and basic punctuation.
        </p>
      )}
    </>
  );
}

export default memo(UpdatableBio);
