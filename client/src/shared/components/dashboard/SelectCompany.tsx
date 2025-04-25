import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMyProjects } from "@/hooks/projects/useMyProjects";
import { BoxIcon } from "lucide-react";
import { CreateProjectsDialog } from "./CreateProjectsDialog";


export function SelectCompany() {
  const { data } = useMyProjects();

  if (!data || data?.length === 0) return <CreateProjectsDialog />

  return (
    <Select defaultValue={data[0].id}>
      <SelectTrigger>
        <BoxIcon className="size-4" />
        <SelectValue placeholder="Select project" />
      </SelectTrigger>
      <SelectContent>
        {data.map(item => (
          <SelectItem key={item.id} value={item.id}>
            {item.name}
            {item.plan === 'business' && (
              <Badge>Business</Badge>
            )}
          </SelectItem>
        ))}

      </SelectContent>
    </Select>
  )
}
