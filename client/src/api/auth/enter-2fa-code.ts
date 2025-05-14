import { api } from "@/shared/api";
import { AuthVerifyRequestQuery } from "@/shared/types/request/auth.type";
import type { AuthAuthenticationResponseQuery } from "@/shared/types/response/auth.type";
import type { AxiosResponse } from "axios";

export async function AuthEnter2FAEndpoint({
  code,
}: AuthVerifyRequestQuery): Promise<AxiosResponse<AuthAuthenticationResponseQuery>> {
  return await api.post<AuthAuthenticationResponseQuery>("/auth/enter-2fa-code", {
    code
  });
}
