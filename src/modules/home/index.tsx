import Container from "@/components/common/Container";
import type { PostResponse } from "@/interfaces/model";
import InitHomePage from "./components/Init";
import PostList from "./components/PostList";
import CreatePostForm from "./components/Form";
import type { CustomSession } from "@/interfaces";

export interface HomeProps {
  datas: PostResponse[];
  session: CustomSession | null;
}

export default function Home({ datas, session }: HomeProps) {
  return (
    <Container as="div" data-aos="fade-up">
      <InitHomePage datas={datas}>
        <CreatePostForm />
        <PostList session={session} />
      </InitHomePage>
    </Container>
  );
}
