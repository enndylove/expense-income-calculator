import { api } from "@/shared/api";
import { ProjectCreateRequestQuery } from "@/shared/types/request/projects.type";
import { ProjectsMyAllResponseQuery } from "@/shared/types/response/projects.type";
import type { AxiosResponse } from "axios";

export async function CreateProjectEndpoint({
  plan,
  name,
  currency,
  businessActivity,
}: ProjectCreateRequestQuery): Promise<AxiosResponse<ProjectsMyAllResponseQuery>> {
  return await api.post<ProjectsMyAllResponseQuery>("/projects", {
    plan,
    name,
    currency,
    businessActivity,
  });
}
