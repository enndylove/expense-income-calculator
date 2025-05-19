import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMyProjects } from "@/hooks/projects/useMyProjects";
import { BoxIcon } from "lucide-react";
import { CreateProjectsDialog } from "./dialogs/CreateProjectsDialog";
import { useRouter } from "@tanstack/react-router";

export interface SelectCompanyProps {
  projectId?: string;
}

export function SelectCompany({ projectId }: SelectCompanyProps) {
  const { data } = useMyProjects();
  const router = useRouter();

  if (!data || data.length === 0) return <CreateProjectsDialog />;

  const onChangeProject = (value: string) => {
    router.navigate({
      to: "/dashboard/$projectId",
      params: { projectId: value }
    });
  }


  return (
    <Select
      defaultValue={projectId}
      onValueChange={(value) => onChangeProject(value)}
    >
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
  );
}
