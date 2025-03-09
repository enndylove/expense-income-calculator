import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(5, {
      message: "Email must be at least 5 characters.",
    })
    .email({
      message: "Invalid email address.",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    }),
});

export type LoginFormValues = z.infer<typeof formSchema>;

export const LoginFormSchema = formSchema;
