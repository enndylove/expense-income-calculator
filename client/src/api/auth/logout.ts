import { api } from "@/shared/api";

export async function AuthLogoutEndpoint() {
  const { data } = await api.get("/auth/logout");
  return data;
}
