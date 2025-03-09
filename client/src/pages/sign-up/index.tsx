import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "@tanstack/react-router";
import { SignUpForm } from "./components/SignUpForm";

export function SignUpComponent() {
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate({
      to: "/login",
    });
  };

  return (
    <Card className="bg-neutral-900 min-w-lg border-neutral-800 text-white">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Sign up</CardTitle>
        <CardDescription className="text-center">
          Create your account for full use service
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm onSuccess={onSuccess} />
      </CardContent>
    </Card>
  );
}
