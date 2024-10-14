"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { memo, useCallback, useState, type ChangeEventHandler } from "react";
import type { CreateCommunityEventProps } from "../interface";
import type { FormAction } from "@/interfaces";
import { Label } from "@/components/ui/label";
import AnimateInput from "@/components/common/AnimateInput";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import SubmitBtn from "@/components/common/SubmitBtn";
import { AppWindowIcon } from "lucide-react";
import { createEvent } from "../../action";
import { swalError } from "@/lib/swal";
import useCsrf from "@/hooks/useCsrf";

export interface CreateEventFormProps {
  communityId: number;
}

function CreateEventForm({ communityId }: CreateEventFormProps) {
  const csrf = useCsrf();
  const [open, setOpen] = useState<boolean>(false);
  const [
    { title, description, location, startTime, endTime, isPublic },
    setData,
  ] = useState<CreateCommunityEventProps>({
    title: "",
    description: "",
    location: "",
    startTime: new Date(),
    endTime: null,
    isPublic: true,
  });

  const onChangeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleDateChange = useCallback(
    (date: Date | undefined, field: "startTime" | "endTime") => {
      if (date) {
        setData((prev) => ({ ...prev, [field]: date }));
      }
    },
    []
  );

  const handleSwitchChange = useCallback((checked: boolean) => {
    setData((prev) => ({ ...prev, isPublic: checked }));
  }, []);

  const handleOnlineLocation = useCallback((checked: boolean) => {
    setData((prev) => ({
      ...prev,
      location: checked ? "online" : "",
    }));
  }, []);

  const actionHandler: FormAction = async (formData) => {
    if (!title || !location || !startTime || formData.get("csrf") !== csrf)
      return;

    formData.delete("description");
    formData.delete("title");
    formData.delete("startTime");
    formData.delete("endTime");
    formData.delete("isPublic");
    formData.delete("location");

    if (communityId) formData.append("communityId", String(communityId));
    formData.append("title", title);
    if (description) formData.append("description", description);
    formData.append("location", location);
    formData.append("startTime", String(startTime));
    if (endTime) formData.append("endTime", String(endTime));
    formData.append("isPublic", String(isPublic));

    const { error, data } = await createEvent(formData);
    if (error) {
      setOpen(false);
      swalError(error || "unexpected error");
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={cn(
            "h-auto flex-row shadow-white dark:shadow-black shadow-sm bg-white dark:bg-[#202225] w-full max-w-3xl  border-4 mb-4 justify-between items-center px-8 py-4 gap-4 rounded-lg",
            "inline-flex"
          )}
        >
          <AppWindowIcon className="w-6 h-6" />
          <Button
            variant="link"
            className="rounded-md justify-start text-neutral-900 dark:text-neutral-300 bg-transparent"
          >
            Create your event
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-[#202225]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <form
          action={actionHandler}
          id="create-event-form"
          className="space-y-4"
        >
          <input type="hidden" name="csrf" value={csrf} id="csrf" />
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <AnimateInput
              id="title"
              name="title"
              value={title}
              onChange={onChangeHandler}
              required
              placeholder="event title..."
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
              id="description"
              name="description"
              value={description}
              onChange={onChangeHandler}
              className={cn(
                "min-h-[150px] p-3 h-40 outline-none w-full px-3 py-2 focus:ring-opacity-50 transition-all duration-200 ease-in-out",
                "text-neutral-900 dark:text-neutral-300 bg-gray-100 dark:bg-gray-600 rounded-md border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500",
                "shadow-sm stroke-slate-50 dark:stroke-slate-900 shadow-white dark:shadow-gray-900"
              )}
              spellCheck
              placeholder="Write your description..."
              rows={4}
              title="description must be at least 3 characters long."
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="isOnline">Online Event?</Label>
              <Switch
                id="isOnline"
                checked={location.toLowerCase() === "online"}
                onCheckedChange={handleOnlineLocation}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <AnimateInput
              id="location"
              name="location"
              value={location}
              onChange={onChangeHandler}
              required
              disabled={location.toLowerCase() === "online"}
            />
          </div>

          <div className="space-y-2">
            <Label>Start Time</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startTime ? (
                    format(startTime, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startTime}
                  onSelect={(date) => handleDateChange(date, "startTime")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>End Time</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endTime ? format(endTime, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endTime || undefined}
                  onSelect={(date) => handleDateChange(date, "endTime")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPublic"
              checked={isPublic}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="isPublic">Public Event</Label>
          </div>

          <SubmitBtn
            text="add new event"
            disabled={!title || !location || !startTime}
            className="bg-blue-500 transition-opacity duration-150 hover:opacity-75 h-12 capitalize w-full"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default memo(CreateEventForm);
