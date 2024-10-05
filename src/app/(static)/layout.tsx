import Container from "@/components/common/Container";
import type { ChildrenProps } from "@/interfaces";
import Main from "@/layouts/Main";

export default function StaticPageLayout({ children }: ChildrenProps) {
  return (
    <Main user={null} visibleRightSection={false}>
      <Container
        readMode
        className="container"
        data-aos="fade-up"
        data-aos-duration="300"
      >
        {children}
      </Container>
    </Main>
  );
}

export const dynamic = "force-static";
