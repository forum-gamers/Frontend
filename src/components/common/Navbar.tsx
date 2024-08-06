"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import PriorityImage from "./PriorityImage";
import { GUEST } from "../images";
import useProfile from "@/modules/user/hooks/useProfile";
import { ChatBubbleLeftEllipsisIcon } from "../icons/HeroIconsSolid";
export default function Navbar() {
  const { me } = useProfile();
  return (
    <nav className="fixed z-10 w-full bg-blue-300 dark:bg-blue-900 p-5 shadow-sm dark:border-b dark:border-neutral-800 ">
      <div className="w-full max-w-7xl mx-auto flex justify-between gap-4 items-center">
        <div className="hidden md:block">Logo</div>
        <figure className="md:hidden rounded-full border-2 border-white shadow-md dark:border-neutral-800">
          <PriorityImage
            height={50}
            width={50}
            className="lg:hover:scale-105 rounded-full"
            alt="profile"
            src={me?.imageUrl || GUEST}
          />
        </figure>
        <Input
          startIcon={Search}
          placeholder="Search"
          className="w-2/3 md:w=1/3"
        />
        <ChatBubbleLeftEllipsisIcon className="md:hidden h-12 w-12" />

        <ul className="hidden md:flex gap-8 w-full justify-around">
          <li>Home</li>
          <li>My network</li>
          <li>Notifications</li>
          <li>Me</li>
        </ul>
      </div>
    </nav>
  );
}
