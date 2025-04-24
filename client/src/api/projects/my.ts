import { api } from "@/shared/api";
import { ProjectsMyAllResponseQuery } from "@/shared/types/response/projects.type";
import type { AxiosResponse } from "axios";

export async function getMyProjectsEndpoint(): Promise<AxiosResponse<ProjectsMyAllResponseQuery>> {
  return await api.get<ProjectsMyAllResponseQuery>("/projects");
}
