import BackBtn from "@/components/common/BackBtn";
import Container from "@/components/common/Container";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Edit, User } from "lucide-react";
import Discord from "@/components/svg/Discord";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import CommunityTab from "./components/CommunityTab";
import type { ChildrenProps, CustomSession } from "@/interfaces";
import TruncateCardText from "@/components/common/TruncateCardText";
import type {
  CommunityListAttributes,
  UserAttributes,
} from "@/interfaces/model";
import UserRecomendationCard from "@/modules/user/components/UserRecomendationCard";
import CommunityImage from "./components/CommunityImage";
import CommunityName from "./components/CommunityName";
import CommunityTotalMember from "./components/CommunityTotalMember";
import CommunityTotalEvent from "./components/CommunityTotalEvent";

export interface CommunityDetailProps extends ChildrenProps {
  members: UserAttributes[];
  session: CustomSession | null;
  data: CommunityListAttributes;
}

export default function CommunityDetail({
  children,
  members = [],
  session,
  data,
}: CommunityDetailProps) {
  return (
    <Container
      data-aos="fade-up"
      data-aos-duration="300"
      className="container mx-auto px-4 py-8"
      as="section"
    >
      <BackBtn url="/community" />

      {/* main */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card
          className={cn(
            "md:col-span-4",
            "bg-white dark:bg-[#202225] shadow-gray-200 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100",
            "flex flex-col"
          )}
        >
          <CardHeader className="relative p-0">
            <CommunityImage />
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-50 p-4 rounded">
              <CommunityName />
              <div className="inline-flex items-center justify-start gap-2">
                <CardDescription className="text-gray-200">
                  <span className="inline-flex items-center">
                    <User className="mr-1 h-4 w-4" />
                    <CommunityTotalMember asChild /> {"  "} members
                  </span>
                  {data?.isDiscordServer && (
                    <Badge
                      variant="secondary"
                      className="mb-2 bg-[#5865F2] hover:bg-[#4752C4] ml-2"
                    >
                      <Discord className="h-4 w-4" />
                    </Badge>
                  )}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-4">
            {data?.description && (
              <TruncateCardText
                className="text-neutral-900 dark:text-neutral-300 text-3xl"
                text={data?.description}
                max={60}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-between w-full flex-wrap gap-2 mt-auto">
            <Button className="bg-blue-500 hover:bg-blue-600 text-neutral-900 dark:text-neutral-300">
              Join Community
            </Button>
            <Button
              variant="outline"
              className="border-none text-neutral-900 dark:text-neutral-300"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Community
            </Button>
          </CardFooter>
        </Card>

        {/* statistic */}
        <aside className="space-y-6 md:col-span-3">
          <Card className="bg-white dark:bg-[#202225] shadow-gray-200 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100">
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <hgroup className="text-center">
                  <CommunityTotalMember className="text-xl font-bold" />
                  <p className="text-xs text-gray-500">Members</p>
                </hgroup>
                <hgroup className="text-center">
                  <CommunityTotalEvent className="text-xl font-bold" />
                  <p className="text-xs text-gray-500">Upcoming Events</p>
                </hgroup>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#202225] shadow-gray-200 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100">
            <CardHeader>
              <CardTitle>Members</CardTitle>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <div className="flex flex-col p-0 overflow-y-scroll">
                {members.map((member) => (
                  <UserRecomendationCard
                    key={member.id}
                    username={member.username}
                    imageUrl={member.imageUrl}
                    id={member.id}
                    isFollower={member.isFollower}
                    session={session}
                    bio={member.bio}
                    createdAt={member.createdAt}
                    backgroundUrl={member.backgroundImageUrl}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* tabs */}
      <Suspense>
        <CommunityTab>{children}</CommunityTab>
      </Suspense>
    </Container>
  );
}
