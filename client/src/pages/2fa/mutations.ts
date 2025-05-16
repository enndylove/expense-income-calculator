import { AuthEnter2FAEndpoint } from "@/api/auth/enter-2fa-code";
import { AuthVerifyRequestQuery } from "@/shared/types/request/auth.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "@/routes/root";
import { useNavigate } from "@tanstack/react-router";
import { AuthResend2FAEndpoint } from "@/api/auth/resend-2fa-code";

import type { AxiosError, AxiosResponse } from "axios";
import type { AuthAuthenticationResponseQuery } from "@/shared/types/response/auth.type";

export const verifyMutation = useMutation<
  AxiosResponse<AuthAuthenticationResponseQuery>,
  AxiosError,
  AuthVerifyRequestQuery
>({
  mutationFn: (values: AuthVerifyRequestQuery) => {
    return AuthEnter2FAEndpoint({
      code: values.code,
    });
  },
  onError: (err) => {
    toast.error("Incorrect data entered.", {
      description: err.message,
    });
  },
  onSuccess: async () => {
    const navigate = useNavigate()

    await queryClient.refetchQueries();
    toast.success("Login successfully.");

    navigate({
      to: '/dashboard'
    });
  },
});

export const resendCodeFunction = (onSuccess?: () => void) => {
  return {
    mutation: useMutation<AxiosResponse<unknown>, AxiosError, unknown>({
      mutationFn: () => {
        return AuthResend2FAEndpoint()
      },
      onError: (err) => {
        toast.error("Error with SMTP", {
          description: err.message,
        })
      },
      onSuccess: async () => {
        toast.success("2FA code sending to your email.");
        onSuccess?.();
      },
    })
  }
}
