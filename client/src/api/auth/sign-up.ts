import { api } from "@/shared/api";
import { AuthSignUpRequestQuery } from "@/shared/types/request/auth.type";
import { AuthSignUpResponseQuery } from "@/shared/types/response/auth.type";
import type { AxiosResponse } from "axios";

export async function AuthSignUpEndpoint({
  email,
  password,
}: AuthSignUpRequestQuery): Promise<AxiosResponse<AuthSignUpResponseQuery>> {
  return await api.post<AuthSignUpResponseQuery>("/auth/sign-up", {
    email,
    password,
  });
}
