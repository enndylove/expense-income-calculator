import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useVerifyMutation } from "../mutations";
import { ControllerRenderProps } from 'react-hook-form';
import { OtpFormValues } from "..";

const otpClassStyle = "h-14 w-12 border-neutral-700 bg-neutral-800 text-center text-xl font-semibold text-white transition-all"

export interface OTPInputProps {
  field: ControllerRenderProps<OtpFormValues, 'otp'>;
}


export function OTPInput({ field }: OTPInputProps) {
  const verifyMutation = useVerifyMutation();

  return (
    <InputOTP maxLength={6} pattern="^[a-zA-Z0-9]+$" disabled={verifyMutation.isPending} {...field}>
      <InputOTPGroup>
        <InputOTPSlot
          index={0}
          className={otpClassStyle}
        />
        <InputOTPSlot
          index={1}
          className={otpClassStyle}
        />
        <InputOTPSlot
          index={2}
          className={otpClassStyle}
        />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot
          index={3}
          className={otpClassStyle}
        />
        <InputOTPSlot
          index={4}
          className={otpClassStyle}
        />
        <InputOTPSlot
          index={5}
          className={otpClassStyle}
        />
      </InputOTPGroup>
    </InputOTP>
  )
}
