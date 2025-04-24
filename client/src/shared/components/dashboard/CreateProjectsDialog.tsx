import { Button } from "@/components/ui/button"
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { SettingsIcon } from "lucide-react"
import { useState } from "react"
import { CreateProjectsForm } from "./CreateProjectsForm"

export function CreateProjectsDialog() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"neutral"} size={"icon"}>
          <SettingsIcon />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-md"
        onPointerDownOutside={(e) => {
          // Prevent closing when clicking inside the currency dropdown
          const target = e.target as HTMLElement
          if (target.closest("[data-radix-popper-content-wrapper]")) {
            e.preventDefault()
          }
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Create Project</DialogTitle>
        </DialogHeader>
        <CreateProjectsForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
