import type { ChildrenProps } from "@/interfaces";
import { memo } from "react";

export interface ContainerProps extends ChildrenProps {
  className?: string;
  withMarginTop?: boolean;
  as?: "div" | "main" | "section";
  readMode?: boolean;
  [key: string]: any | undefined;
}

function Container({
  children,
  className = "",
  withMarginTop = true,
  as: ContainerTag = "div",
  readMode,
  ...rest
}: ContainerProps) {
  const classname = `mb-10 ${
    (readMode || withMarginTop) && "mt-6"
  } p-4 md:p-8 lg:pr-0 ${className} max-w-screen `;

  return (
    <ContainerTag data-testid="container" className={classname} {...rest}>
      {children}
    </ContainerTag>
  );
}

export default memo(Container);
