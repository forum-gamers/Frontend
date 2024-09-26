import LazyLoadImg from "@/components/common/LazyLoadImage";
import { GUEST } from "@/components/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
    <Card className="overflow-hidden min-h-[375px] hover:scale-[98.5%] hover:opacity-95 transition-all duration-300 shadow-sm hover:shadow-lg">
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
          <h3 className="text-lg font-bold">{team.name}</h3>
          <div className="relative w-8 h-8">
            <LazyLoadImg
              src={team?.gameImageUrl}
              alt={team.gameName}
              fill
              className="object-cover rounded-full hover:opacity-75 transition-opacity duration-300"
            />
          </div>
        </div>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Game:{" "}
          {team.gameName.length > 20
            ? `${team.gameName.slice(0, 20)}...`
            : team.gameName}
        </CardDescription>
        <div className="flex items-center justify-between mb-2">
          <CardDescription className="flex items-center">
            <UserIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">
              {team.totalMember ?? 0}/{team.maxMember ?? 0} members
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
