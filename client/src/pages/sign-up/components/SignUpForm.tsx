import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SignUpFormSchema,
  type SignUpFormValues,
} from "@/shared/schemas/auth/signUpFromSchema";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import type { AuthSignUpResponseQuery } from "@/shared/types/response/auth.type";
import { AuthSignUpEndpoint } from "@/api/auth/sign-up";

interface SignUpFormProps {
  onSuccess?: () => void;
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const singUpMutation = useMutation<
    AxiosResponse<AuthSignUpResponseQuery>,
    AxiosError,
    SignUpFormValues
  >({
    mutationFn: (values: SignUpFormValues) => {
      return AuthSignUpEndpoint({
        email: values.email,
        password: values.password,
      });
    },
    onError: (err) => {
      toast.error("Something went wrong.", {
        description: err.message,
      });
    },
    onSuccess: () => {
      toast.success("Sign up successfully.");
      onSuccess?.();
    },
  });

  function onSubmit(values: SignUpFormValues) {
    singUpMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="email@example.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="neutral"
          className="w-full"
          size="lg"
          type="submit"
          disabled={singUpMutation.isPending}
        >
          {singUpMutation.isPending ? "Processing..." : "Sign up"}
        </Button>
      </form>
    </Form>
  );
}
