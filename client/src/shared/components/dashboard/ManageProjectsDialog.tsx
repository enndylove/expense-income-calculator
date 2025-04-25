import { useState } from "react"
import { Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useMyProjects } from "@/hooks/projects/useMyProjects"
import { ProjectCard } from "./ProjectCard"
import { CreateProjectsDialog } from "./CreateProjectsDialog"

export function ManageProjectsDialog() {
  const [open, setOpen] = useState<boolean>(false)
  const { refetch, data } = useMyProjects()

  const handleDelete = async (id: string) => {
    console.log(id)

    refetch()
  }

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

        <ScrollArea className="h-[350px] pr-4 space-y-2">
          {data && data.length > 0 ? (
            <div className="space-y-4">
              {data.map((project) => (
                <ProjectCard key={project.id} project={project} onDelete={() => handleDelete(project.id)} />
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
