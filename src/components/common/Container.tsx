import type { ChildrenProps } from "@/interfaces";
import { cn } from "@/lib/utils";
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
  className,
  withMarginTop = true,
  as: ContainerTag = "div",
  readMode,
  ...rest
}: ContainerProps) {
  return (
    <ContainerTag
      {...rest}
      data-testid="container"
      className={cn(
        "mb-10",
        (readMode || withMarginTop) && "mt-4",
        "p-4 md:p-8",
        className,
        "max-w-screen",
        "aos-init aos-animate"
      )}
    >
      {children}
    </ContainerTag>
  );
}

export default memo(Container);
