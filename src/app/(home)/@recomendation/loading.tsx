import SkeletonCard from "@/components/common/SkeletonCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Loading() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="space-y-4">
        <h4 className="mb-4 text-sm font-medium leading-none">May you know</h4>
        <SkeletonCard />
      </div>
    </ScrollArea>
  );
}
