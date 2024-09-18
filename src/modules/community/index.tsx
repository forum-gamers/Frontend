import Container from "@/components/common/Container";
import { Suspense } from "react";
import type { CustomSession } from "@/interfaces";
import DialogWrapper from "./components/DialogWrapper";

export interface CommunityPageProps {
  session: CustomSession | null;
}

export default function CommunityPage({ session }: CommunityPageProps) {
  return (
    <Container className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-blue-500">Discover Community</h1>
      <Suspense>
        <DialogWrapper session={session} />
      </Suspense>
    </Container>
  );
}
