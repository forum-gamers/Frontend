import Container from "@/components/common/Container";
import type { CommentResponse } from "@/interfaces/model";
import Init from "./components/Init";
import CommentList from "./components/CommentList";
import CommentForm from "./components/Form";
import BackBtn from "@/components/common/BackBtn";

export interface CommentProps {
  datas: CommentResponse[];
  postId: number;
}

export default function Comment({ datas, postId }: CommentProps) {
  return (
    <Container as="div" data-aos="fade-up">
      <Init datas={datas}>
        <BackBtn url="/" />
        <CommentForm postId={postId} />
        <CommentList />
      </Init>
    </Container>
  );
}
