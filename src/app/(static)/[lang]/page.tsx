import type { Lang, PageProps } from "@/interfaces";
import HomePage from "@/modules/home";

export default function Page({ params: { lang } }: PageProps<{ lang: Lang }>) {
  return <HomePage lang={lang} />;
}

export const dynamic = "force-static";
