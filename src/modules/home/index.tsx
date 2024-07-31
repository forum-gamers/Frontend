import Container from "@/components/common/Container";
import type { PostResponse } from "@/interfaces/model";
import InitHomePage from "./components/Init";
import PostList from "./components/PostList";

export interface HomeProps {
  datas: PostResponse[];
}

export default function Home({ datas }: HomeProps) {
  return (
    <Container as="div" data-aos="fade-up">
      <InitHomePage datas={datas}>
        <PostList />
      </InitHomePage>
    </Container>
  );
}
