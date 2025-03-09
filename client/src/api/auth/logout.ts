import { api } from "@/shared/api";

export async function AuthLogoutEndpoint() {
  const { data } = await api.post("/auth/logout");
  return data;
}
