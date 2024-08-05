import Container from "@/components/common/Container";
import Init from "./components/Init";
import type { PostResponse } from "@/interfaces/model";
import type { CustomSession } from "@/interfaces";
import BookmarkList from "./components/BookmarkList";

export interface BookmarkPageProps {
  datas: PostResponse[];
  session: CustomSession | null;
}

export default function BookmarkPage({ datas, session }: BookmarkPageProps) {
  return (
    <Container as="div" data-aos="fade-up">
      <Init datas={datas}>
        <BookmarkList session={session} />
      </Init>
    </Container>
  );
}
