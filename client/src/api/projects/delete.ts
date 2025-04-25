import { api } from "@/shared/api";
import { ProjecDeleteRequestQuery } from "@/shared/types/request/projects.type";

export async function DeleteProjectEndpoint({
  id,
}: ProjecDeleteRequestQuery) {
  return await api.delete(`/projects/${id}`);
}
