import { useState, useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, RefreshCw } from "lucide-react"
import Aurora from "@/components/Bits/Aurora/Aurora"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useResendVerufyMutation, useVerifyMutation } from "./mutations"
import { OTPInput } from "./components/OTPInput"

// Define the Zod schema for OTP validation
const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Code must be 6 characters")
    .regex(/^[A-Z0-9]+$/, "Code must contain only big letters and numbers"),
})

// Infer the type from the schema
export type OtpFormValues = z.infer<typeof otpSchema>

export function TwoFAComponent() {
  const verifyMutation = useVerifyMutation();

  const [resendDisabled, setResendDisabled] = useState(false)
  const [countdown, setCountdown] = useState(0)

  // Initialize the form with Zod resolver
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  })

  const resendSuccess = () => {
    setResendDisabled(true)
    setCountdown(60)
  }

  const resendVerifyMutation = useResendVerufyMutation(resendSuccess);

  // Handle form submission
  const onSubmit = (data: OtpFormValues) => {
    verifyMutation.mutate({
      code: data.otp,
    })
  }

  // Handle resend code
  const handleResendCode = () => {
    resendVerifyMutation.mutate({})
  }

  // Countdown timer effect
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else if (countdown === 0) {
      setResendDisabled(false)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [countdown])

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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <OTPInput field={field} />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="flex w-full items-center justify-center gap-2 text-sm text-neutral-400 before:h-px before:flex-1 before:bg-neutral-800 after:h-px after:flex-1 after:bg-neutral-800">
                  Options
                </div>

                <div className="flex w-full justify-between gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset({ otp: "" })}
                    disabled={verifyMutation.isPending}
                    className="flex-1 border-neutral-700 bg-transparent text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  >
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    variant="neutral"
                    disabled={verifyMutation.isPending || !form.formState.isValid}
                    className="flex-1"
                  >
                    {verifyMutation.isPending ? (
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
                  type="button"
                  variant="ghost"
                  className="mt-2 text-neutral-400 hover:text-white"
                  onClick={handleResendCode}
                  disabled={resendDisabled || resendVerifyMutation.isPending}
                >
                  <RefreshCw className={`mr-2 h-4 w-4 ${resendVerifyMutation.isPending ? "animate-spin" : ""}`} />
                  {resendDisabled ? `Resend code (${countdown}s)` : "Resend verification code"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default TwoFAComponent
