import LazyLoadImg from "@/components/common/LazyLoadImage";
import { GUEST } from "@/components/images";
import Discord from "@/components/svg/Discord";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import type { CommunityListAttributes } from "@/interfaces/model";
import { cn } from "@/lib/utils";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import sanitize from "sanitize-html";

export interface CommunityCardProps {
  community: CommunityListAttributes;
}

function CommunityCard({ community }: CommunityCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[102%] cursor-pointer shadow-sm min-h-[375px] my-4",
        "bg-white dark:bg-[#202225] shadow-gray-200 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100"
      )}
    >
      <CardHeader className="p-0 w-full rounded-md">
        <div className="w-full overflow-hidden flex justify-center items-center">
          <LazyLoadImg
            src={community?.imageUrl || GUEST}
            alt={community.name}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 h-[6.75rem] space-y-1">
        <CardTitle
          className="text-xl mb-2 flex-wrap"
          dangerouslySetInnerHTML={{
            __html: sanitize(
              community?.name.length > 30
                ? community.name.slice(0, 30) + "..."
                : community.name
            ),
          }}
        ></CardTitle>
        <div className="flex items-center text-muted-foreground">
          <Users size={16} className="mr-1" />
          <span>{community.totalMember} members</span>
        </div>
        {community.isDiscordServer && (
          <Badge
            variant="secondary"
            className="mb-2 bg-[#5865F2] hover:bg-[#4752C4]"
          >
            <Discord className="h-4 w-4" />
          </Badge>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 mb-0">
        <Button
          asChild
          className={cn(
            "bg-blue-500 hover:bg-blue-600",
            "transition-all duration-300 hover:opacity-75 hover:scale-[98.5%]",
            "text-neutral-900 dark:text-neutral-300",
            "w-full"
          )}
        >
          <Link prefetch href={`/communities/${community.id}`}>
            <span>Join Community</span>
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default memo(CommunityCard);
