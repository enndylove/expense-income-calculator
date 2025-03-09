import { api } from "@/shared/api";
import { AuthSignUpRequestQuery } from "@/shared/types/request/auth.type";
import { AuthSignUpResponseQuery } from "@/shared/types/response/auth.type";

export async function AuthSignUpEndpoint({
  email,
  password,
}: AuthSignUpRequestQuery) {
  const { data } = await api.post<AuthSignUpResponseQuery>("/auth/sign-up", {
    email,
    password,
  });
  return data;
}
