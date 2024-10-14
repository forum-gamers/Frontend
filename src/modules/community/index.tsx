import Container from "@/components/common/Container";
import { Suspense } from "react";
import type { CustomSession } from "@/interfaces";
import DialogWrapper from "./components/DialogWrapper";
import type { CommunityListAttributes } from "@/interfaces/model";
import CommunitySearch from "./components/CommunitySearch";
import Init from "./components/Init";
import CommunityList from "./components/CommunityList";

export interface CommunityPageProps {
  session: CustomSession | null;
  initialDatas: CommunityListAttributes[];
}

export default function CommunityPage({
  session,
  initialDatas,
}: CommunityPageProps) {
  return (
    <Container className="container" data-aos="fade-up" data-aos-duration="300">
      <Suspense>
        <Init datas={initialDatas} />
      </Suspense>
      <header className="flex justify-between gap-2 items-center mb-8 flex-wrap">
        <h1 className="text-xl font-bold text-blue-500 capitalize">
          Discover Community
        </h1>
        <Suspense>
          <CommunitySearch />
        </Suspense>
        <Suspense>
          <DialogWrapper session={session} />
        </Suspense>
      </header>
      <CommunityList />
    </Container>
  );
}
