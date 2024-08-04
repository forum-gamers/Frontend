import Container from "@/components/common/Container";
import type { ChildrenProps } from "@/interfaces";

export default function UserLayout({ children }: ChildrenProps) {
  return (
    <Container
      as="main"
      className="w-full flex flex-col gap-4 min-h-screen mt-0 lg:mt-10 lg:pr-10 lg:max-w-xl xl:max-w-3xl justify-center"
      data-aos="fade-up"
    >
      {children}
    </Container>
  );
}
