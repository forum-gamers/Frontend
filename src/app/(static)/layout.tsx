import Container from "@/components/common/Container";
import type { ChildrenProps } from "@/interfaces";

export default function StaticPageLayout({ children }: ChildrenProps) {
  return (
    <Container
      readMode
      className="container"
      data-aos="fade-up"
      data-aos-duration="300"
      as="main"
    >
      {children}
    </Container>
  );
}

export const dynamic = "force-static";
