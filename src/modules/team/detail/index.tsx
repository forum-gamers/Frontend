import BackBtn from "@/components/common/BackBtn";
import Container from "@/components/common/Container";
import NoDataState from "@/components/common/NoDataState";
import PriorityImage from "@/components/common/PriorityImage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { CustomSession } from "@/interfaces";
import type { GetTeamDto, GetTeamMemberAttributes } from "@/interfaces/model";
import { Trophy, Users } from "lucide-react";
import MemberList from "./components/MemberList";
import type { Fetcher } from "@/hooks/useScroll";
import InitMemberSection from "./components/InitMemberSection";
import JoinBtn from "./components/JoinBtn";
import InitTeamDetail from "./components/InitTeamDetail";
import SeeJoinListBtn from "./components/SeeJoinListBtn";
import TotalMemberSection from "./components/TotalMemberSection";

export interface TeamDetailProps {
  session: CustomSession | null;
  members: GetTeamMemberAttributes[];
  fetcher: Fetcher<GetTeamMemberAttributes>;
  data: GetTeamDto;
}

export default function TeamDetail({
  session,
  members = [],
  data,
  fetcher,
}: TeamDetailProps) {
  return (
    <Container as="section" data-aos="fade-up" data-aos-duration="300">
      <InitMemberSection datas={members} />
      <InitTeamDetail data={data} />

      <header className="bg-white dark:bg-[#202225] border-b border-r border-l rounded-sm shadow-sm md:w-[95%] md:mx-auto">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <BackBtn />
          <h1 className="text-2xl font-bold font-sans text-blue-500 antialiased hover:underline-offset-2 hover:underline duration-300 transition-transform cursor-pointer">
            {data.name}
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
                  <PriorityImage
                    src={data.imageUrl}
                    alt={`${data.name} logo`}
                    width={100}
                    height={100}
                    className="rounded-full mb-4 sm:mb-0 sm:mr-6"
                  />
                  <hgroup className="text-center sm:text-left antialiased px-1">
                    <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
                    <p className="text-muted-foreground mb-4">
                      {data.gameName}
                    </p>{" "}
                  </hgroup>
                </div>
                <div className="text-center sm:text-left">
                  <CardDescription>
                    {data.description?.slice(0, 255)}
                  </CardDescription>

                  <TotalMemberSection />
                  <div className="flex justify-end">
                    {session?.user?.id === data.owner && (
                      <SeeJoinListBtn session={session} />
                    )}
                    {session?.user?.id !== data.owner && <JoinBtn />}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <NoDataState />
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5" />
                  Tournament
                </CardTitle>
              </CardHeader>
              <CardContent>
                <NoDataState />
              </CardContent>
            </Card>
          </div>
          <Card className="md:max-h-[30%] md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center !text-lg text-center">
                <Users className="mr-2 h-5 w-5" />
                Members
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MemberList session={session} fetcher={fetcher} />
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
