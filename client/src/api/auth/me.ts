import { api } from "@/shared/api";

export async function AuthMeEndpoint() {
  const { data } = await api.get("/auth/me");
  return data;
}
