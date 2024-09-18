import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { memo } from "react";

function ButtonCreateCommunity() {
  return (
    <Button
      className={cn(
        "bg-blue-500 hover:bg-blue-600",
        "transition-all duration-300 hover:opacity-75 hover:scale-[98.5%]",
        "text-neutral-900 dark:text-neutral-300"
      )}
    >
      <Plus className="mr-2 h-4 w-4" /> Create Community
    </Button>
  );
}

export default memo(ButtonCreateCommunity);
