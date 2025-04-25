import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ProjectsMyAllResponseQuery } from "@/shared/types/response/projects.type"
import { Briefcase, Calendar, CreditCard, Edit2, MoreHorizontal, Trash2 } from "lucide-react"
import { EditProjectDialog } from "./dialogs/EditProjectDialog"
import { format } from "date-fns"

interface ProjectCardProps {
  project: ProjectsMyAllResponseQuery
  onDelete: () => void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const formattedCreatedDate = format(new Date(project.createdAt), "MMM d, yyyy")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  return (
    <>
      <Card className="overflow-hidden pt-2 pb-0 gap-2">
        <div className="flex items-start justify-between p-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h3 className="font-medium leading-none">{project.name}</h3>
              <Badge variant={project.plan === "business" ? "default" : "secondary"} className="text-xs px-1.5 py-0">
                {project.plan.charAt(0).toUpperCase() + project.plan.slice(1)}
              </Badge>
            </div>
            <div className="grid gap-0.5">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                <span>Created on {formattedCreatedDate}</span>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <CreditCard className="h-3.5 w-3.5 mr-1.5" />
                <span>Currency: {project.currency}</span>
              </div>

              {project.plan === "business" && project.businessActivity && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="h-3.5 w-3.5 mr-1.5" />
                  <span>Business activity: {project.businessActivity}</span>
                </div>
              )}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={onDelete} className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="bg-muted/40 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">

          </div>
        </div>
      </Card >

      <EditProjectDialog
        project={project}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />
    </>
  )
}
