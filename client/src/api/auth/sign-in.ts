import { api } from "@/shared/api";
import { AuthSignInRequestQuery } from "@/shared/types/request/auth.type";
import { AuthSignInResponseQuery } from "@/shared/types/response/auth.type";

export async function AuthSignInEndpoint({
  email,
  password,
}: AuthSignInRequestQuery) {
  const { data } = await api.post<AuthSignInResponseQuery>("/auth/sign-in", {
    email,
    password,
  });
  return data;
}
