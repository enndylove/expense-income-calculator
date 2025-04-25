import { api } from "@/shared/api";

export async function AuthLogoutEndpoint() {
  const res = await api.get("/auth/logout");
  return res.data.message;
}
