import Container from "@/components/common/Container";
import type { CommentResponse } from "@/interfaces/model";
import Init from "./components/Init";

export interface CommentProps {
  datas: CommentResponse[];
}

export default function Comment({ datas }: CommentProps) {
  return (
    <Container as="section" data-aos="fade-up">
      <Init datas={datas}>
        <div></div>
      </Init>
    </Container>
  );
}
