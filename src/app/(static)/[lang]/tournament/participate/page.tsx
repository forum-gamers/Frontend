import SupportedLang from "@/components/common/SupportedLang";
import type { Lang, PageProps } from "@/interfaces";
import ParticipateTourStaticPage from "@/modules/tournament/static/participate";

export default function Page({ params: { lang } }: PageProps<{ lang: Lang }>) {
  return (
    <SupportedLang lang={lang}>
      <ParticipateTourStaticPage lang={lang} />
    </SupportedLang>
  );
}

export const dynamic = "force-static";
