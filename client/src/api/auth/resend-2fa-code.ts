import { api } from "@/shared/api";
import type { AuthSignInResponseQuery } from "@/shared/types/response/auth.type";
import type { AxiosResponse } from "axios";

export async function AuthResend2FAEndpoint(): Promise<AxiosResponse<AuthSignInResponseQuery>> {
  return await api.post<AuthSignInResponseQuery>("/auth/resend-2fa-code");
}
