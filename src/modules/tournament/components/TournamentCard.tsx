import { Card } from "@/components/ui/card";
import type { TournamentData } from "@/interfaces/model";
import { cn } from "@/lib/utils";

export interface TournamentCardProps {
  data: TournamentData;
}

export default function TournamentCard({ data }: TournamentCardProps) {
  return (
    <Card
      className={cn(
        "min-h-[375px] max-w-[350px] max-h-[375px] overflow-visible h-full hover:scale-[98.5%] hover:opacity-95 transition-all duration-300 shadow-sm hover:shadow-lg p-2",
        "bg-white dark:bg-[#202225] shadow-gray-200 dark:shadow-slate-950 dark:stroke-slate-950 stroke-gray-100"
      )}
    ></Card>
  );
}
