"use client";

import {
  memo,
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEventHandler,
} from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { SUPPORTED_IMAGE_TYPE } from "@/constants/global";
import AnimateInput from "@/components/common/AnimateInput";
import FileForm, {
  type OnFileChangeHandler,
} from "@/components/common/FileForm";
import SubmitBtn from "@/components/common/SubmitBtn";
import { cn } from "@/lib/utils";
import type { FormAction } from "@/interfaces";
import SelectGame from "./SelectGame";
import { createTeam } from "../action";
import useForm from "../hooks/useForm";
import { swalError } from "@/lib/swal";
import useTeam from "../hooks/useTeam";

function CreateTeamForm() {
  const ref = useRef<HTMLFormElement>(null);
  const { setOpen } = useForm();
  const { setDatas } = useTeam();
  const csrfToken = useId();
  const [{ name, description, isPublic, gameId }, setData] = useState({
    name: "",
    description: "",
    isPublic: true,
    gameId: 0,
  });
  const [file, setFile] = useState<File | null>(null);

  const actionHandler: FormAction = async (formData) => {
    if (formData.get("csrf") !== csrfToken || !name || !gameId || !file) return;

    formData.delete("name");
    formData.delete("description");
    formData.delete("isPublic");
    formData.delete("file");

    formData.append("name", name);
    formData.append("description", description);
    formData.append("isPublic", String(isPublic));
    formData.append("gameId", String(gameId));
    formData.append("file", file);

    const { error, data } = await createTeam(formData);
    setOpen(false);
    if (error || !data) {
      swalError(error || "unexpected error");
      return;
    }

    if (ref.current) ref.current.reset();
    const { game, team, user } = data;
    if (game && team && user)
      setDatas([
        {
          id: team.id,
          name: team.name,
          description: team.description,
          imageUrl: team.imageUrl,
          owner: team.owner,
          totalMember: 1,
          gameId: game.id,
          maxMember: game.minPlayer,
          isPublic: team.isPublic,
          createdAt: team.createdAt.toString(),
          isJoined: true,
          gameName: game.name,
          gameImageUrl: game.imageUrl,
          gameCode: game.code,
          ownerUsername: user.username,
          ownerImageUrl: user.imageUrl,
          ownerBio: user.bio,
          ownerCreatedAt: user.createdAt,
          ownerBackgroundImageUrl: user.backgroundImageUrl,
          status: true,
        },
      ]);
  };

  const onCheckedChange = useCallback(
    (props: boolean) => setData((prev) => ({ ...prev, isPublic: props })),
    []
  );

  const onChangeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const onFileChange: OnFileChangeHandler = useCallback(([file]) => {
    setFile(file);
  }, []);

  const gameOnChangeHandler = useCallback((gameId: string) => {
    const id = parseInt(gameId);
    if (isNaN(id)) return;
    setData((prev) => ({ ...prev, gameId: id }));
  }, []);

  return (
    <form
      ref={ref}
      id="create-team-form"
      className="space-y-4"
      action={actionHandler}
    >
      <input type="hidden" name="csrf" value={csrfToken} id="csrf" />
      <div className="space-y-2">
        <Label
          className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-300 after:content-['*'] after:ml-0.5 after:text-red-500"
          htmlFor="name"
        >
          Team Name
        </Label>
        <AnimateInput
          id="name"
          onChange={onChangeHandler}
          value={name}
          required
          name="name"
          pattern="{3,}$"
          title="name must be at least 3 characters long."
          className={cn(
            "border border-gray-300 text-gray-900",
            "appearance-none sm:text-sm rounded-lg focus:blue-600 focus:border-teal-600 block w-full p-2.5",
            "bg-gray-100 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          )}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          onChange={onChangeHandler}
          className={cn(
            "min-h-[150px] p-3 h-40 outline-none w-full px-3 py-2 focus:ring-opacity-50 transition-all duration-200 ease-in-out",
            "text-neutral-900 dark:text-neutral-300 bg-gray-100 dark:bg-gray-600 rounded-md border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500",
            "shadow-sm stroke-slate-50 dark:stroke-slate-900 shadow-white dark:shadow-gray-900"
          )}
          value={description}
          spellCheck
          placeholder="Write your description..."
          rows={4}
          id="description"
          title="description must be at least 3 characters long."
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="isPublic"
          checked={isPublic}
          onCheckedChange={onCheckedChange}
        />
        <Label htmlFor="isPublic">Public Team</Label>
      </div>

      <SelectGame onChangeHandler={gameOnChangeHandler} />

      <div className="space-y-4">
        <Label
          htmlFor="image"
          className="after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Upload Image
        </Label>
        <FileForm
          accept={SUPPORTED_IMAGE_TYPE}
          id="file"
          placeHolder="Add images"
          onFileChange={onFileChange}
          name="file"
          required
          className="w-full h-4"
        />
      </div>
      <SubmitBtn
        disabled={!name || !gameId || !file}
        text="Create team"
        type="submit"
        className={cn(
          "w-full py-3 px-4 inline-flex justify-center items-center gap-2 ",
          "rounded-md hover:scale-[98.5%] duration-300 border border-transparent font-semibold transition-all text-sm",
          "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        )}
      />
    </form>
  );
}

export default memo(CreateTeamForm);
