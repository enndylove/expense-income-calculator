import { api } from "@/shared/api";
import type { AuthSignInRequestQuery } from "@/shared/types/request/auth.type";
import type { AuthSignInResponseQuery } from "@/shared/types/response/auth.type";
import type { AxiosResponse } from "axios";

export async function AuthResend2FAEndpoint({
  email,
}: AuthSignInRequestQuery): Promise<AxiosResponse<AuthSignInResponseQuery>> {
  return await api.post<AuthSignInResponseQuery>("/auth/resend-2fa-code", {
    email,
  });
}
