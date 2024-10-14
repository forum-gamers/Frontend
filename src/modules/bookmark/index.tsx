import Container from "@/components/common/Container";
import Init from "./components/Init";
import type { PostResponse } from "@/interfaces/model";
import type { CustomSession } from "@/interfaces";
import BookmarkList from "./components/BookmarkList";

export interface BookmarkPageProps {
  session: CustomSession | null;
}

export default function BookmarkPage({ session }: BookmarkPageProps) {
  return (
    <Container as="div" data-aos="fade-up">
      <Init>
        <BookmarkList session={session} />
      </Init>
    </Container>
  );
}
