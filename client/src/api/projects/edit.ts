import { api } from "@/shared/api";
import { ProjecEditRequestQuery } from "@/shared/types/request/projects.type";

export async function EditProjectEndpoint({
  id,
  name,
  businessActivity,
}: ProjecEditRequestQuery) {
  return await api.patch(`/projects/${id}`, {
    name,
    businessActivity,
  });
}
