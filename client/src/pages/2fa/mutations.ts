import { AuthEnter2FAEndpoint } from "@/api/auth/enter-2fa-code";
import { AuthVerifyRequestQuery } from "@/shared/types/request/auth.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { AuthResend2FAEndpoint } from "@/api/auth/resend-2fa-code";

import type { AxiosError, AxiosResponse } from "axios";
import type { AuthAuthenticationResponseQuery } from "@/shared/types/response/auth.type";

export function useVerifyMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    AxiosResponse<AuthAuthenticationResponseQuery>,
    AxiosError,
    AuthVerifyRequestQuery
  >({
    mutationFn: (values) => {
      return AuthEnter2FAEndpoint({
        code: values.code,
      });
    },
    onError: (err) => {
      toast.error('Incorrect data entered.', {
        description: err.message,
      });
    },
    onSuccess: async () => {
      await queryClient.refetchQueries();
      toast.success('Login successfully.');
      navigate({ to: '/dashboard' });
    },
  });
}

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
