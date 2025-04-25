import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { EditProjectForm } from "./EditProjectForm";
import type { Dispatch, SetStateAction } from "react";
import type { ProjectsMyAllResponseQuery } from "@/shared/types/response/projects.type";

interface EditProjectDialogProps {
  project: ProjectsMyAllResponseQuery;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export function EditProjectDialog({
  project,
  isEditDialogOpen,
  setIsEditDialogOpen
}: EditProjectDialogProps) {
  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <EditProjectForm
          project={project}
          setIsEditDialogOpen={setIsEditDialogOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
