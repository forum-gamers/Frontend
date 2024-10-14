import Container from "@/components/common/Container";
import type { ChildrenProps } from "@/interfaces";
import Main from "@/layouts/Main";
import { getMe } from "@/modules/user/action";
import { memo } from "react";

export interface UserLayoutProps extends ChildrenProps {}

async function UserLayout({ children }: UserLayoutProps) {
  const { data } = await getMe();

  return (
    <Main user={data}>
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

export default memo(UserLayout);

export const experimental_ppr = true;
