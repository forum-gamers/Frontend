"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GameAttributes } from "@/interfaces/model";
import { memo, useEffect, useState, useTransition } from "react";
import { fetchGame } from "../action";
import { cn } from "@/lib/utils";
import Loader from "@/components/svg/Loader";
import LazyLoadImg from "@/components/common/LazyLoadImage";

export interface SelectGameProps {
  onChangeHandler: (value: string) => void;
}

function SelectGame({ onChangeHandler }: SelectGameProps) {
  const [pending, startTransition] = useTransition();
  const [games, setGames] = useState<GameAttributes[]>([]);

  useEffect(() => {
    startTransition(async () => {
      if (!games.length) {
        const { data = [] } = await fetchGame();

        setGames(data);
      }
    });
  }, []);

  return (
    <div className="space-y-2">
      <Label
        className="after:content-['*'] after:ml-0.5 after:text-red-500"
        htmlFor="game"
      >
        Select Game
      </Label>
      <Select required onValueChange={onChangeHandler}>
        <SelectTrigger
          id="game"
          className={cn(
            "border border-gray-300 text-gray-900",
            "appearance-none sm:text-sm rounded-lg focus:blue-600 focus:border-blue-600",
            "bg-gray-100 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          )}
        >
          <SelectValue placeholder="Select Game" />
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
              games?.map((game) => (
                <SelectItem
                  key={game.id}
                  value={game.id.toString()}
                  className={cn(
                    "outline-none w-full transition-all duration-200 ease-in-out mx-auto",
                    "text-neutral-900 dark:text-neutral-300",
                    "shadow-sm stroke-slate-50 dark:stroke-slate-900 shadow-white dark:shadow-gray-900",
                    "cursor-pointer"
                  )}
                >
                  <div className="flex items-center justify-start gap-2 w-52">
                    <LazyLoadImg
                      src={game.imageUrl}
                      alt={game.name}
                      width={24}
                      height={24}
                      className="rounded-full object-cover object-center aspect-square"
                    />
                    {game.name.length > 20
                      ? `${game.name.slice(0, 20).trim()}...`
                      : game.name.trim()}
                  </div>
                </SelectItem>
              ))
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default memo(SelectGame);
