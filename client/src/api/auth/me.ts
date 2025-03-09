import { api } from "@/shared/api";

export async function AuthMeEndpoint() {
  const { data } = await api.post("/auth/me");
  return data;
}
