import { Button } from "@/components/ui/button";
import CreateTeamDialog from "./CreateTeamDialog";
import { cn } from "@/lib/utils";
import Form from "./Form";
import { Plus } from "lucide-react";

export default function DialogWrapper() {
  /**
   * info
   * this approach is for triggering ssr as much as possible
   */
  return (
    <CreateTeamDialog
      content={<Form />}
      trigger={
        <Button
          className={cn(
            "bg-blue-500 hover:bg-blue-600",
            "transition-all duration-300 hover:opacity-75 hover:scale-[98.5%]",
            "text-neutral-900 dark:text-neutral-300"
          )}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create your team
        </Button>
      }
    />
  );
}
