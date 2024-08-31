import { ScrollArea } from "@/components/ui/scroll-area";
import UserRecomendationCard from "./UserRecomendationCard";
import type { UserRecomendationAttributes } from "@/interfaces/model";
import { memo } from "react";
import type { CustomSession } from "@/interfaces";
import ListRecomendation from "./ListRecomendation";

export interface RecomendationSectionProps {
  data: UserRecomendationAttributes[];
  session: CustomSession | null;
}

function RecomendationSection({
  data = [],
  session,
}: RecomendationSectionProps) {
  return (
    <section className="w-full" id="recomendation">
      <h4 className="mb-4 text-sm font-medium leading-none">You may know</h4>
      <ScrollArea className="h-72 w-full rounded-md flex items-center no-scrollbar scroll-smooth">
        <ListRecomendation initialData={data} session={session} />
      </ScrollArea>
    </section>
  );
}

export default memo(RecomendationSection);
