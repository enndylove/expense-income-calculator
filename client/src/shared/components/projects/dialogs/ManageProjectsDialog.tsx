import { useState } from "react"
import { Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMyProjects } from "@/hooks/projects/useMyProjects"
import { ProjectCard } from "../ProjectCard"
import { CreateProjectsDialog } from "../dialogs/CreateProjectsDialog"
import { useMutation } from "@tanstack/react-query"
import type { ProjectDeleteRequestQuery } from "@/shared/types/request/projects.type"
import { DeleteProjectEndpoint } from "@/api/projects/delete"
import { toast } from "sonner"

export function ManageProjectsDialog() {
  const [open, setOpen] = useState<boolean>(false)
  const { refetch, data } = useMyProjects()

  const deleteMutation = useMutation({
    mutationKey: ["delete-project"],
    mutationFn: (values: ProjectDeleteRequestQuery) => {
      return DeleteProjectEndpoint(values);
    },
    onError: (err) => {
      toast.error("Something went wrong.", {
        description: err.message,
      });
    },
    onSuccess: () => {
      toast.success(`Project deleted.`);
      refetch()
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="neutral" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Manage Projects</DialogTitle>
          <CreateProjectsDialog />
        </DialogHeader>

        <ScrollArea className="h-[350px] space-y-2">
          {data && data.length > 0 ? (
            <div className="space-y-4">
              {data.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={() => deleteMutation.mutate({ id: project.id })}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <p className="text-muted-foreground mb-4">No projects found</p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
