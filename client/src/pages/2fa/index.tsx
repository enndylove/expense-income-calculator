import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RefreshCw } from "lucide-react"
import Aurora from "@/components/Bits/Aurora/Aurora"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AuthAuthenticationResponseQuery } from "@/shared/types/response/auth.type"
import { AxiosError, AxiosResponse } from "axios"
import { AuthEnter2FAEndpoint } from "@/api/auth/enter-2fa-code"
import { toast } from "sonner"
import { AuthVerifyRequestQuery } from "@/shared/types/request/auth.type"
import { useNavigate } from "@tanstack/react-router"
import { AuthResend2FAEndpoint } from "@/api/auth/resend-2fa-code"

export function TwoFAComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const [otp, setOtp] = useState<string>("")
  const [isVerifying, _setIsVerifying] = useState(false)
  const [error, _setError] = useState<string | null>(null)
  const [resendDisabled, _setResendDisabled] = useState(false)
  const [countdown, _setCountdown] = useState(0)

  const verifyMutation = useMutation<
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
      await queryClient.refetchQueries();
      toast.success("Login successfully.");
      navigate({
        to: '/dashboard'
      });
    },
  });

  const resendCode = useMutation<
    AxiosResponse<unknown>,
    AxiosError,
    unknown
  >({
    mutationFn: () => {
      return AuthResend2FAEndpoint();
    },
    onError: (err) => {
      toast.error("Error with SMTP", {
        description: err.message,
      });
    },
    onSuccess: async () => {
      toast.success("2FA code sending to your email.");
    },
  })

  const handleVerify = () => {
    verifyMutation.mutate({
      code: otp
    })
  }

  // Reset fields
  const handleReset = () => {
    setOtp("")
  }

  const handleResendCode = () => {
    resendCode.mutate({});
  }

  // Handle OTP change
  const handleOTPChange = (value: string) => {
    setOtp(value)
  }

  return (
    <div className="fixed left-0 top-0 h-full w-full">
      <Aurora colorStops={["#211C84", "#4D55CC", "#7A73D1"]} blend={0.5} amplitude={1.0} speed={0.5} />
      <div className="absolute left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 px-4">
        <Card className="border-neutral-800 bg-neutral-900/90 text-white backdrop-blur-md">
          <CardHeader className="pt-2">
            <CardTitle className="text-center text-2xl font-bold">Two-Factor Authentication</CardTitle>
            <CardDescription className="text-center text-neutral-400">
              Enter the 6-character code from your authenticator app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex justify-center">
                <InputOTP
                  value={otp}
                  onChange={handleOTPChange}
                  maxLength={6}
                  pattern="^[a-zA-Z0-9]+$"
                  disabled={isVerifying}
                >
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={0}
                      className="h-14 w-12 border-neutral-700 bg-neutral-800 text-center text-xl font-semibold text-white transition-all"
                    />
                    <InputOTPSlot
                      index={1}
                      className="h-14 w-12 border-neutral-700 bg-neutral-800 text-center text-xl font-semibold text-white transition-all"
                    />
                    <InputOTPSlot
                      index={2}
                      className="h-14 w-12 border-neutral-700 bg-neutral-800 text-center text-xl font-semibold text-white transition-all"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={3}
                      className="h-14 w-12 border-neutral-700 bg-neutral-800 text-center text-xl font-semibold text-white transition-all"
                    />
                    <InputOTPSlot
                      index={4}
                      className="h-14 w-12 border-neutral-700 bg-neutral-800 text-center text-xl font-semibold text-white transition-all"
                    />
                    <InputOTPSlot
                      index={5}
                      className="h-14 w-12 border-neutral-700 bg-neutral-800 text-center text-xl font-semibold text-white transition-all"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {error && <p className="text-center text-sm text-red-500">{error}</p>}

              <div className="flex w-full items-center justify-center gap-2 text-sm text-neutral-400 before:h-px before:flex-1 before:bg-neutral-800 after:h-px after:flex-1 after:bg-neutral-800">
                Options
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex w-full justify-between gap-4">
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isVerifying}
                className="flex-1 border-neutral-700 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white"
              >
                Reset
              </Button>
              <Button
                variant="neutral"
                onClick={handleVerify}
                disabled={isVerifying || otp.length !== 6}
                className="flex-1"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>

            <Button
              variant="ghost"
              className="mt-2 text-neutral-400 hover:text-white"
              onClick={handleResendCode}
              disabled={resendDisabled}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${resendDisabled ? "animate-spin" : ""}`} />
              {resendDisabled ? `Resend code (${countdown}s)` : "Resend verification code"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default TwoFAComponent
