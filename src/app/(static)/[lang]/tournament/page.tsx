import SupportedLang from "@/components/common/SupportedLang";
import type { Lang, PageProps } from "@/interfaces";
import ExplainTourFeature from "@/modules/tournament/static/explain";

export default function Page({ params: { lang } }: PageProps<{ lang: Lang }>) {
  return (
    <SupportedLang lang={lang}>
      <ExplainTourFeature lang={lang} />
    </SupportedLang>
  );
}

export const dynamic = "force-static";
