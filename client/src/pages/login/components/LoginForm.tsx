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
  LoginFormSchema,
  LoginFormValues,
} from "@/shared/schemas/auth/loginFormSchema";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: LoginFormValues) {
    console.log(values);
    onSuccess?.();
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
                <Input placeholder="shadcn" {...field} />
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
                <Input type="password" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="neutral" className="w-full" size={"lg"} type="submit">
          Login
        </Button>
      </form>
    </Form>
  );
}
