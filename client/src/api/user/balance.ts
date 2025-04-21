import { api } from "@/shared/api";
import type { UserBalanceResponse } from "@/shared/types/response/user.type";

export async function getUserBalanceEndpoint(): Promise<UserBalanceResponse> {
  const response = await api.get<UserBalanceResponse>("/user/balance");
  return response.data;
}
