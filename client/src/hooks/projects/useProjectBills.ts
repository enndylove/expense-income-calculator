import { useQuery } from "@tanstack/react-query";
import { getMyProjectBillsEndpoint } from "@/api/projects/bills";
import type { ProjectBillsRequestQuery } from "@/shared/types/request/projects.type";

export function useProjectBills(id: ProjectBillsRequestQuery["id"]) {
  return useQuery({
    queryKey: ["project-bills", id],
    queryFn: () => getMyProjectBillsEndpoint({ id }),
    enabled: !!id,
  });
}
