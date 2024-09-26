"use client";

import LazyLoadImg from "@/components/common/LazyLoadImage";
import SubmitBtn from "@/components/common/SubmitBtn";
import { GUEST } from "@/components/images";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormAction } from "@/interfaces";
import type { DiscordGuild } from "@/interfaces/model";
import { cn } from "@/lib/utils";
import {
  memo,
  useCallback,
  useEffect,
  useId,
  useState,
  useTransition,
} from "react";
import { getMyGuild, importDiscordServer } from "../action";
import Loader from "@/components/svg/Loader";
import { swalError } from "@/lib/swal";
import { signIn } from "next-auth/react";
import useCommunity from "../hooks/useCommunity";
import useForm from "../hooks/useForm";

function ImportedForm() {
  const csrf = useId();
  const { setDatas } = useCommunity();
  const { setOpen } = useForm();
  const [pending, startTransition] = useTransition();
  const [selectedServer, setSelectedServer] = useState<string>("");
  const [discordServers, setDiscordServers] = useState<
    Pick<DiscordGuild, "id" | "owner" | "name" | "icon">[]
  >([]);

  const onChangeHandler = useCallback(
    (value: string) => {
      if (discordServers.map(({ id }) => id).includes(value))
        setSelectedServer(value);
    },
    [discordServers, setSelectedServer]
  );

  useEffect(() => {
    startTransition(async () => {
      const { data = [] } = await getMyGuild();
      setDiscordServers(
        (data || [])
          ?.map((el) => ({
            id: el.id,
            owner: el.owner,
            name: el.name,
            icon: el.icon,
          }))
          .filter(({ owner }) => owner)
      );
    });
  }, []);

  const actionHandler: FormAction = async (formData) => {
    if (!selectedServer || formData.get("csrf") !== csrf) return;

    formData.delete("discordServerId");
    formData.append("discordServerId", selectedServer);

    const { data, error } = await importDiscordServer(formData);

    if (error) {
      setOpen(false);
      swalError(error);
      return;
    }

    if (data) {
      if (data?.refreshedToken && data?.token)
        await signIn("credentials", {
          access_token: data?.token,
          redirect: false,
        });

      if (data?.community)
        setDatas([
          {
            ...data.community,
            totalMember: 1,
            totalPost: 0,
            isMember: true,
            createdAt: data.community.createdAt.toString(),
            updatedAt: data.community.updatedAt.toString(),
            totalEvent: 0,
          },
        ]);
      setOpen(false);
      return;
    }

    swalError("Something went wrong");
  };

  return (
    <form
      id="imported-community-form"
      className="space-y-4 min-h-[414px] flex flex-col justify-between"
      action={actionHandler}
    >
      <input type="hidden" name="csrf" value={csrf} id="csrf" />
      <div className="space-y-2">
        <Label htmlFor="discord-server">Select Discord Server</Label>
        <Select defaultValue={selectedServer} onValueChange={onChangeHandler}>
          <SelectTrigger
            className={cn(
              "border border-gray-300 text-gray-900",
              "appearance-none sm:text-sm rounded-lg focus:blue-600 focus:border-blue-600",
              "bg-gray-100 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            )}
            id="discord-server"
          >
            <SelectValue placeholder="Select a server" />
          </SelectTrigger>
          <SelectContent className="flex items-center">
            <SelectGroup>
              {pending ? (
                <SelectItem
                  value="loading"
                  disabled
                  className={cn(
                    "outline-none transition-all duration-200 ease-in-out",
                    "text-neutral-900 dark:text-neutral-300",
                    "shadow-sm stroke-slate-50 dark:stroke-slate-900 shadow-white dark:shadow-gray-900",
                    "cursor-not-allowed",
                    "flex items-center justify-center"
                  )}
                >
                  <Loader className="w-3 h-3" />
                </SelectItem>
              ) : (
                discordServers.map((server) => (
                  <SelectItem
                    className={cn(
                      "outline-none w-full transition-all duration-200 ease-in-out mx-auto",
                      "text-neutral-900 dark:text-neutral-300",
                      "shadow-sm stroke-slate-50 dark:stroke-slate-900 shadow-white dark:shadow-gray-900",
                      "cursor-pointer"
                    )}
                    key={server.id}
                    value={server.id}
                  >
                    <div className="flex items-center justify-start gap-2 w-52">
                      <LazyLoadImg
                        src={
                          server?.icon
                            ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`
                            : GUEST
                        }
                        alt={server.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      {server.name.length > 20
                        ? `${server.name.slice(0, 20).trim()}...`
                        : server.name.trim()}
                    </div>
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <SubmitBtn
        text="Import"
        disabled={!selectedServer || pending}
        type="submit"
        className={cn(
          "w-full py-3 px-4 inline-flex justify-center items-center gap-2",
          "rounded-md border border-transparent font-semibold transition-all text-sm",
          "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        )}
      />
    </form>
  );
}

export default memo(ImportedForm);
