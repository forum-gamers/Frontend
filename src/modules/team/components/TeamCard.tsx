import LazyLoadImg from "@/components/common/LazyLoadImage";
import { GUEST } from "@/components/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { GetTeamDto } from "@/interfaces/model";
import { cn } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { memo } from "react";

export interface TeamCardProps {
  team: GetTeamDto;
}

function TeamCard({ team }: TeamCardProps) {
  return (
    <Card
      className={cn(
        "min-h-[375px] max-w-[350px] max-h-[375px] overflow-visible h-full hover:scale-[98.5%] hover:opacity-95 transition-all duration-300 shadow-sm hover:shadow-lg p-2",
        "bg-white dark:bg-[#202225] shadow-gray-200 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100"
      )}
    >
      <div className="relative aspect-video">
        <LazyLoadImg
          src={team?.imageUrl || GUEST}
          alt={team.name}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      </div>
      <CardContent className="p-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold truncate">{team.name}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative w-8 h-8">
                  <LazyLoadImg
                    src={team?.gameImageUrl}
                    alt={team.gameName}
                    fill
                    className="object-cover rounded-full hover:opacity-75 transition-opacity duration-300"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="overflow-visible z-50 absolute right-4">
                <p className="min-w-max text-sm text-neutral-900 dark:text-neutral-300 antialiased truncate">
                  {team.gameName}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Game:{" "}
          {team.gameName.length > 8
            ? `${team.gameName.slice(0, 8)}...`
            : team.gameName}
        </CardDescription>
        <div className="flex items-center justify-between mb-2">
          <CardDescription className="flex items-center">
            <UserIcon className="w-4 h-4 mr-2" />
            <span className="text-xs md:text-sm">
              {team.totalMember ?? 0} / {team.maxMember ?? 0} members
            </span>
          </CardDescription>
        </div>
        <Progress
          value={(team.totalMember / team.maxMember) * 100}
          className="mb-2"
        />
        <Button
          className={cn(
            "bg-blue-500 hover:bg-blue-600",
            "transition-all duration-300 hover:opacity-75 hover:scale-[98.5%]",
            "text-neutral-900 dark:text-neutral-300",
            "w-full"
          )}
          asChild
        >
          <Link href={`/team/${team.id}`} prefetch>
            See Team
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default memo(TeamCard);
