import Container from "@/components/common/Container";
import type { CommentResponse, PostResponse } from "@/interfaces/model";
import Init from "./components/Init";
import CommentList from "./components/CommentList";
import CommentForm from "./components/Form";
import BackBtn from "@/components/common/BackBtn";
import Breakline from "@/components/common/Breakline";
import PostCard from "../home/components/PostCard";

export interface CommentProps {
  datas: CommentResponse[];
  post: PostResponse;
}

export default function Comment({ datas, post }: CommentProps) {
  return (
    <Container as="div" data-aos="fade-up">
      <Init datas={datas}>
        <BackBtn url="/" />
        <PostCard data={post} session={null} as="page" />
        <Breakline className="mb-4" />
        <CommentForm postId={post.id} />
        <CommentList />
      </Init>
    </Container>
  );
}
