import Container from "@/components/common/Container";
import type { CommentResponse } from "@/interfaces/model";
import Init from "./components/Init";
import CommentList from "./components/CommentList";

export interface CommentProps {
  datas: CommentResponse[];
}

export default function Comment({ datas }: CommentProps) {
  return (
    <Container as="section" data-aos="fade-up">
      <Init datas={datas}>
        <CommentList />
      </Init>
    </Container>
  );
}
