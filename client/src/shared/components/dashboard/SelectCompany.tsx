import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BoxIcon } from "lucide-react";


export function SelectCompany() {
  return (
    <Select defaultValue="digital">
      <SelectTrigger>
        <BoxIcon className="size-4" />
        <SelectValue placeholder="Select project" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="digital">Project 1</SelectItem>
        <SelectItem value="physical">Project 2</SelectItem>
        <SelectItem value="service">Project 3</SelectItem>
        <SelectItem value="subscription">Project 4</SelectItem>
        <SelectItem value="other">Project 5</SelectItem>
      </SelectContent>
    </Select>
  )
}
