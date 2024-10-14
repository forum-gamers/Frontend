"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { memo, type ReactNode } from "react";
import useForm from "../hooks/useForm";

export interface DialogCreateCommunityProps {
  btnTrigger: ReactNode;
  manualTab: ReactNode;
  discordTab: ReactNode;
}

function DialogCreateCommunity({
  btnTrigger,
  manualTab,
  discordTab,
}: DialogCreateCommunityProps) {
  const { open, setOpen } = useForm();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{btnTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-[#202225]">
        <DialogHeader>
          <DialogTitle className="text-blue-500">
            Create New Community
          </DialogTitle>
          <DialogDescription className="text-neutral-900 dark:text-neutral-300">
            Fill out the details to create your own community or import your
            Discord server.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="manual" className="w-full min-h-[390px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">Manual</TabsTrigger>
            <TabsTrigger value="discord">Import from Discord</TabsTrigger>
          </TabsList>
          <TabsContent value="manual">{manualTab}</TabsContent>
          <TabsContent value="discord">{discordTab}</TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default memo(DialogCreateCommunity);
