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
import { User } from "lucide-react";
import Discord from "@/components/svg/Discord";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import CommunityTab from "./components/CommunityTab";
import type { ChildrenProps, CustomSession } from "@/interfaces";
import type {
  CommunityListAttributes,
  UserAttributes,
} from "@/interfaces/model";
import UserRecomendationCard from "@/modules/user/components/UserRecomendationCard";
import CommunityImage from "./components/CommunityImage";
import CommunityName from "./components/CommunityName";
import CommunityTotalMember from "./components/CommunityTotalMember";
import CommunityTotalEvent from "./components/CommunityTotalEvent";
import ButtonEdit from "./components/ButtonEdit";
import CommunityDescription from "./components/CommunityDescription";
import ButtonJoin from "./components/ButtonJoin";
import CommunityTotalPost from "./components/CommunityTotalPost";

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
            "bg-white dark:bg-gray-900 shadow-gray-200 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100",
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
                </CardDescription>
                {data?.isDiscordServer && (
                  <Badge
                    variant="secondary"
                    className="mb-2 bg-[#5865F2] hover:bg-[#4752C4] ml-2"
                  >
                    <Discord className="h-4 w-4" />
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-4">
            <CommunityDescription />
          </CardContent>
          <CardFooter className="flex justify-between w-full flex-wrap gap-2 mt-auto">
            {data?.isMember &&
              data?.role &&
              ["admin", "owner"].includes(data.role) && (
                <ButtonEdit communityId={data.id} />
              )}
            <ButtonJoin session={session} communityId={data.id} />
          </CardFooter>
        </Card>

        {/* statistic */}
        <aside className="space-y-6 md:col-span-3">
          <Card className="bg-white dark:bg-gray-900 shadow-gray-200 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100">
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6">
                <hgroup className="text-center col-span-2">
                  <CommunityTotalMember className="text-xl font-bold" />
                  <p className="text-xs text-gray-500">Members</p>
                </hgroup>
                <hgroup className="text-center col-span-2">
                  <CommunityTotalPost className="text-xl font-bold" />
                  <p className="text-xs text-gray-500">Posts</p>
                </hgroup>
                <hgroup className="text-center col-span-2">
                  <CommunityTotalEvent className="text-xl font-bold" />
                  <p className="text-xs text-gray-500">Upcoming Events</p>
                </hgroup>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 shadow-gray-200 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100">
            <CardHeader>
              <CardTitle>Members</CardTitle>
            </CardHeader>
            <CardContent className="overflow-hidden">
              <div className="flex flex-col p-0 overflow-y-scroll space-y-2">
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
