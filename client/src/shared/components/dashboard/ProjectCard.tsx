import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ProjectsMyAllResponseQuery } from "@/shared/types/response/projects.type"
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react"

interface ProjectCardProps {
  project: ProjectsMyAllResponseQuery
  onDelete: () => void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const formattedDate = new Date(project.createdAt).toLocaleDateString()

  return (
    <Card className="overflow-hidden pt-2 pb-0 gap-2">
      <div className="flex items-start justify-between p-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h3 className="font-medium leading-none">{project.name}</h3>
            <Badge variant={project.plan === "business" ? "default" : "secondary"} className="text-xs px-1.5 py-0">
              {project.plan.charAt(0).toUpperCase() + project.plan.slice(1)}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">Created on {formattedDate}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={onDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="bg-muted/40 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium">{project.currency}</span>
          {project.businessActivity && (
            <span className="text-xs text-muted-foreground truncate max-w-[150px]">{project.businessActivity}</span>
          )}
        </div>
        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
          View
        </Button>
      </div>
    </Card>
  )
}
