import Container from "@/components/common/Container";
import { Suspense } from "react";
import TeamSearch from "./components/TeamSearch";
import DialogWrapper from "./components/DialogWrapper";
import type { CustomSession } from "@/interfaces";
import type { GetTeamDto } from "@/interfaces/model";
import InitPage from "./components/Init";
import TeamList from "./components/TeamList";

export interface TeamPageProps {
  session: CustomSession | null;
  datas: GetTeamDto[];
}

export default function TeamPage({ session, datas }: TeamPageProps) {
  return (
    <Container
      as="section"
      data-aos="fade-up"
      data-aos-duration="300"
      className="w-full"
    >
      <InitPage datas={datas} />
      <header className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <hgroup className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-blue-500">
              Join Gaming Teams
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Connect with fellow gamers, join teams, and dominate your favorite
              games together.
            </p>
          </hgroup>
          <div className="flex justify-between items-center gap-2 w-full flex-wrap-reverse">
            <Suspense>
              <DialogWrapper />
            </Suspense>
            <Suspense>
              <TeamSearch />
            </Suspense>
          </div>
        </div>
      </header>
      <TeamList />
    </Container>
  );
}
