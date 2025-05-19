import { Separator } from "@/components/ui/separator";
import { useProjectBills } from "@/hooks/projects/useProjectBills";
import { PencilLineIcon, PlusIcon } from "lucide-react";

export function ProjectNavigation({ projectId }: { projectId: string }) {
  const { data: projectBills } = useProjectBills(projectId);

  console.log(projectBills)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-neutral-800 dark:text-neutral-600">Total amount on bills</span>
        <span className="text-3xl font-bold">{"$"} {"123 123"}</span>
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">My bills</span>
          <div className="flex items-center gap-2">
            <PlusIcon className="size-5" />
            <PencilLineIcon className="size-5" />
          </div>
        </div>
        <div className="flex flex-col gap-1">

        </div>
      </div>
    </div>
  )
}
