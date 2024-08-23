import Container from "@/components/common/Container";
import type { ChildrenProps } from "@/interfaces";
import Main from "@/layouts/Main";

export default function UserLayout({ children }: ChildrenProps) {
  return (
    <Main>
      <Container
        as="section"
        className="w-full mx-auto flex-grow flex flex-col gap-4 min-h-screen mt-0 lg:mt-10 lg:pr-10 max-w-xl xl:max-w-3xl justify-center"
        data-aos="fade-up"
      >
        {children}
      </Container>
    </Main>
  );
}
