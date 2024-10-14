import SupportedLang from "@/components/common/SupportedLang";
import type { Lang, PageProps } from "@/interfaces";
import CreateTourStaticPage from "@/modules/tournament/static/create";

export default function Page({ params: { lang } }: PageProps<{ lang: Lang }>) {
  return (
    <SupportedLang lang={lang}>
      <CreateTourStaticPage lang={lang} />
    </SupportedLang>
  );
}

export const dynamic = "force-static";
