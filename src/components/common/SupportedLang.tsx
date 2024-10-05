import { LANGS } from "@/constants/global";
import type { ChildrenProps, Lang } from "@/interfaces";
import { notFound } from "next/navigation";
import { memo } from "react";

export interface SupportedLangProps extends ChildrenProps {
  lang: Lang;
}

function SupportedLang({ children, lang }: SupportedLangProps) {
  if (!LANGS.includes(lang)) notFound();

  return children;
}

export default memo(SupportedLang);
