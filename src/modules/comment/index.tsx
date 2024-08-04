import Container from "@/components/common/Container";
import type { CommentResponse, PostResponse } from "@/interfaces/model";
import Init from "./components/Init";
import CommentList from "./components/CommentList";
import CommentForm from "./components/Form";
import BackBtn from "@/components/common/BackBtn";
import Breakline from "@/components/common/Breakline";
import PostCard from "../home/components/PostCard";
import type { CustomSession } from "@/interfaces";

export interface CommentProps {
  datas: CommentResponse[];
  post: PostResponse;
  session: CustomSession | null;
}

export default function Comment({ datas, post, session }: CommentProps) {
  return (
    <Container as="div" data-aos="fade-up">
      <Init datas={datas}>
        <BackBtn url="/" />
        <PostCard data={post} session={session} as="page" dataAos="fade-up" />
        <Breakline className="mb-4" />
        <CommentForm postId={post.id} />
        <Breakline className="mb-4" />
        <CommentList postId={post.id} />
      </Init>
    </Container>
  );
}
