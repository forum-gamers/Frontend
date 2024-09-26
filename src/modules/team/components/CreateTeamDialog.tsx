"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { memo, type ReactNode } from "react";
import useForm from "../hooks/useForm";

export interface CreateTeamDialogProps {
  trigger: ReactNode;
  content: ReactNode;
}

function CreateTeamDialog({ trigger, content }: CreateTeamDialogProps) {
  const { open, setOpen } = useForm();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-[#202225]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}

export default memo(CreateTeamDialog);
