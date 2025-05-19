import { api } from "@/shared/api";
import type { ProjectBillsRequestQuery } from "@/shared/types/request/projects.type";
import type { ProjectsBillsResponseQuery } from "@/shared/types/response/projects.type";

export async function getMyProjectBillsEndpoint({
  id
}: ProjectBillsRequestQuery): Promise<ProjectsBillsResponseQuery[]> {
  const { data } = await api.get<ProjectsBillsResponseQuery[]>(`/projects/${id}/bills`);
  return data
}
