import { api } from "@/shared/api";
import { ProjectsMyAllResponseQuery } from "@/shared/types/response/projects.type";

export async function getMyProjectsEndpoint(): Promise<ProjectsMyAllResponseQuery[]> {
  const { data } = await api.get<ProjectsMyAllResponseQuery[]>("/projects");
  return data
}
